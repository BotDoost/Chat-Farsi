const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    // نمایش پیام کاربر
    addMessage(message, 'user');
    userInput.value = '';
    
    try {
        // دریافت پاسخ از مدل
        const response = await fetchModelResponse(message);
        addMessage(response, 'bot');
    } catch (error) {
        addMessage("خطا در ارتباط با سرور", 'bot');
        console.error(error);
    }
}

async function fetchModelResponse(prompt) {
    // استفاده از GitHub Pages? نیاز به یک راه حل امن برای توکن داریم
    // راه حل موقت: استفاده از یک تابع API سرور (در ادامه توضیح داده شده)
    
    // این فقط یک نمونه است - در عمل نیاز به یک سرور واسط دارید
    const response = await fetch('https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1-0528', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_TOKEN_HERE' // در عمل اینجا نباید توکن قرار دهید!
        },
        body: JSON.stringify({ inputs: prompt })
    });
    
    const data = await response.json();
    return data[0]?.generated_text || "پاسخی دریافت نشد";
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    chatBox.appendChild(messageBox);
    chatBox.scrollTop = chatBox.scrollHeight;
}
