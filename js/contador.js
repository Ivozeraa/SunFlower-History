 function atualizarContador() {
        // Data inicial: 3 de agosto de 2024, 12:33
        const inicio = new Date("2025-10-01T16:33:00");
        const agora = new Date();
        let diff = Math.floor((agora - inicio) / 1000); // diferença em segundos

        // Total de dias corridos
        const diasTotais = Math.floor(diff / (24 * 60 * 60));
        diff %= 24 * 60 * 60;

        const horas = Math.floor(diff / 3600);
        diff %= 3600;

        const minutos = Math.floor(diff / 60);
        const segundos = diff % 60;

        // Exibe de forma mais humana
        document.getElementById("contador-tempo").innerText =
            `Essa história começou há ${diasTotais} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos.`;
    }
        
            // Atualiza a cada segundo
            setInterval(atualizarContador, 1000);
            atualizarContador();