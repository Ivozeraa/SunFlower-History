const text = "Feliz 3 meses de Girassol!";
  const typingElement = document.getElementById("typing");
  const cursor = document.querySelector(".cursor");

  let index = 0;
  const speed = 90;

  function typeWriter() {
    if (index < text.length) {
      typingElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    } else {
      // quando terminar de escrever
      setTimeout(() => {
        cursor.style.display = "none";
      }, 500);
    }
  }

  typeWriter();