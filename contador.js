const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

function generateCountdownImage() {
  // Crear un lienzo (canvas)
  const canvas = createCanvas(400, 200);
  const context = canvas.getContext('2d');

  // Fecha de vencimiento del contador regresivo
  const targetDate = new Date('2023-11-08 11:36:00');

  // Función para actualizar el contador
  function updateCountdown() {
    // Calcular el tiempo restante
    const currentDate = new Date();
    const timeRemaining = targetDate - currentDate;

    // Convertir el tiempo restante a días, horas, minutos y segundos
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Dibujar el contador regresivo en el lienzo
    context.clearRect(0, 0, canvas.width, canvas.height); // Borrar el lienzo
    context.fillStyle = 'white';
    context.font = '40px Arial';
    context.fillText(`Días: ${days}`, 50, 50);
    context.fillText(`Horas: ${hours}`, 50, 100);
    context.fillText(`Minutos: ${minutes}`, 50, 150);
    context.fillText(`Segundos: ${seconds}`, 50, 200);

    // Guardar la imagen generada en un archivo
    const out = fs.createWriteStream(__dirname + '/contador_regresivo.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);
  }

  // Ejecutar la función de actualización cada segundo
  setInterval(updateCountdown, 1000);

  // Ejecutar la actualización inicial
  updateCountdown();
}

generateCountdownImage();
