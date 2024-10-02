import axios from 'axios';
import { MessageTypes } from './presets';

class MyTranscriptionPipeline {
    static apiKey = 'YOUR_GOOGLE_CLOUD_API_KEY';
    static apiUrl = `https://speech.googleapis.com/v1/speech:recognize?key=${MyTranscriptionPipeline.apiKey}`;
    static instance = null;

    static async transcribe(audioBlob) {
        const audioBase64 = await MyTranscriptionPipeline.convertToBase64(audioBlob);
        const requestPayload = {
            config: {
                encoding: 'LINEAR16', // Change depending on your audio format
                sampleRateHertz: 16000,
                languageCode: 'en-US',
            },
            audio: {
                content: audioBase64,
            },
        };

        try {
            const response = await axios.post(MyTranscriptionPipeline.apiUrl, requestPayload);
            return response.data.results[0].alternatives[0].transcript;
        } catch (err) {
            console.error('Error during transcription:', err.message);
        }
    }

    static convertToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result.split(',')[1];
                resolve(base64data);
            };
            reader.onerror = (error) => reject(error);
        });
    }
}

self.addEventListener('message', async (event) => {
    const { type, audio } = event.data;
    if (type === MessageTypes.INFERENCE_REQUEST) {
        const transcript = await MyTranscriptionPipeline.transcribe(audio);
        createResultMessage(transcript);
    }
});

function createResultMessage(transcript) {
    self.postMessage({
        type: MessageTypes.RESULT,
        transcript
    });
}