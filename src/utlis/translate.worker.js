import axios from 'axios';
import { MessageTypes } from './presets'; // Assuming you have this already

class MyTranslationPipeline {
    static translationApiKey = 'YOUR_GOOGLE_CLOUD_API_KEY';
    static translationApiUrl = `https://translation.googleapis.com/language/translate/v2?key=${MyTranslationPipeline.translationApiKey}`;

    static async transcribeAndTranslate(audioBlob, targetLanguage = 'es') {
        // Step 1: Transcribe the audio using Google Cloud Speech-to-Text API
        const transcription = await MyTranscriptionPipeline.transcribe(audioBlob);

        // Step 2: Translate the transcription into the target language
        if (transcription) {
            const translatedText = await MyTranslationPipeline.translateText(transcription, targetLanguage);
            return translatedText;
        }
    }

    static async translateText(text, targetLanguage) {
        const requestPayload = {
            q: text,
            target: targetLanguage,
        };

        try {
            const response = await axios.post(MyTranslationPipeline.translationApiUrl, requestPayload);
            return response.data.data.translations[0].translatedText;
        } catch (err) {
            console.error('Error during translation:', err.message);
        }
    }
}

self.addEventListener('message', async (event) => {
    const { type, audio, targetLanguage } = event.data;
    if (type === MessageTypes.INFERENCE_REQUEST) {
        const translatedText = await MyTranslationPipeline.transcribeAndTranslate(audio, targetLanguage);
        createResultMessage(translatedText);
    }
});

function createResultMessage(translatedText) {
    self.postMessage({
        type: MessageTypes.RESULT,
        translatedText
    });
}