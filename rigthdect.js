// Sistema de Banimento por Right-Click
class RightClickBanSystem {
    constructor() {
        this.isInitialized = false;
        this.banKey = 'rightClickBanned';
        this.banTimeKey = 'rightClickBanTime';
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        // Verifica se já está banido ao carregar a página
        this.checkBanStatus();
        
        // Adiciona listeners para detectar right-click
        this.addRightClickListeners();
        
        // Adiciona listeners para botões da tela de banimento
        this.addBannedScreenListeners();
        
        this.isInitialized = true;
        console.log('🚫 Sistema Anti Right-Click ativado!');
    }

    checkBanStatus() {
        const isBanned = localStorage.getItem(this.banKey) === 'true';
        
        if (isBanned) {
            this.showBannedScreen();
        }
    }

    addRightClickListeners() {
        // Previne menu de contexto em toda a página
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.triggerBan();
            return false;
        });

        // Detecta botão direito do mouse
        document.addEventListener('mousedown', (e) => {
            if (e.button === 2) { // Botão direito
                e.preventDefault();
                this.triggerBan();
                let Mensagem = document.getElementById("Motivoss").innerHTML = '<strong>Motivo:</strong> Você clicou com "<b>BOTÃO DIREITO</b>".</p>'
                return false, Mensagem;
            }
        });

        // Detecta combinações de teclas suspeitas
        document.addEventListener('keydown', (e) => {
            // F12 (DevTools)
            if (e.key === 'F12') {
                e.preventDefault();
                this.triggerBan();
                let Mensagem = document.getElementById("Motivoss").innerHTML = '<strong>Motivo:</strong> Você usou "F12".</p>'
                return false, Mensagem;
            }
            
            // Ctrl+Shift+I (DevTools - Inspector)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                this.triggerBan();
                let Mensagem = document.getElementById("Motivoss").innerHTML = '<strong>Motivo:</strong> Você usou "CTRL SHIFT I".</p>'
                return false, Mensagem;
            }
            
            // Ctrl+Shift+C (DevTools - Element Inspector)
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                this.triggerBan();
                let Mensagem = document.getElementById("Motivoss").innerHTML = '<strong>Motivo:</strong> Você usou "CTRL SHIFT C".</p>'
                return false, Mensagem;
                
            }
            
            // Ctrl+Shift+J (DevTools - Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
                this.triggerBan();
                let Mensagem = document.getElementById("Motivoss").innerHTML = '<strong>Motivo:</strong> Você usou "CTRL SHIFT J".</p>'
                return false, Mensagem;
            }
            
            // Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                this.triggerBan();
                let Mensagem = document.getElementById("Motivoss").innerHTML = '<strong>Motivo:</strong> Você usou "CTRL SHIFT U".</p>'
                return false, Mensagem;
            }
            
            // Ctrl+Shift+K (Firefox Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'K') {
                e.preventDefault();
                this.triggerBan();
                let Mensagem = document.getElementById("Motivoss").innerHTML = '<strong>Motivo:</strong> Você usou "CTRL SHIFT K".</p>'
                return false, Mensagem;
            }
            
            // Ctrl+Shift+E (Firefox Network)
            if (e.ctrlKey && e.shiftKey && e.key === 'E') {
                e.preventDefault();
                this.triggerBan();
                let Mensagem = document.getElementById("Motivoss").innerHTML = '<strong>Motivo:</strong> Você usou "CTRL SHIFT E".</p>'

                return false, Mensagem;
            }
        });

        // Detecta tentativas de arrastar
        document.addEventListener('dragstart', (e) => {
            e.preventDefault();
            this.triggerBan();
            return false;
        });
    }

    triggerBan() {
        // Salva o estado de banimento
        localStorage.setItem(this.banKey, 'true');
        localStorage.setItem(this.banTimeKey, new Date().toLocaleString('pt-BR'));
        
        // Mostra tela de banimento
        this.showBannedScreen();
        
        // Log do banimento
        console.log('🚨 USUÁRIO BANIDO! Violação: Ação proibida detectada');
        
        // Efeito sonoro (se disponível)
        this.playBanSound();
        
        // Vibração (se disponível em dispositivos móveis)
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 200]);
        }
    }

    showBannedScreen() {
        const normalContent = document.getElementById('normal-content');
        const bannedScreen = document.getElementById('banned-screen');
        const banTimeElement = document.getElementById('ban-time');
        
        if (normalContent) normalContent.style.display = 'none';
        if (bannedScreen) bannedScreen.style.display = 'flex';
        
        // Atualiza o horário do banimento
        const banTime = localStorage.getItem(this.banTimeKey) || new Date().toLocaleString('pt-BR');
        if (banTimeElement) banTimeElement.textContent = banTime;

        // Bloqueia scroll
        document.body.style.overflow = 'hidden';
        
        // Muda o título da página
        document.title = '🚫 BANIDO - Acesso Negado';
    }

    addBannedScreenListeners() {
        // Botão de recurso (fake)
        const appealBtn = document.getElementById('appeal-btn');
        if (appealBtn) {
            appealBtn.addEventListener('click', () => {
                alert('📝 Recurso enviado!\n\nSeu recurso foi registrado no sistema.\nComo já havia sido alertado, sua conta será banida.\nCaso deseje recorrer, abra um ticket no Discord e informe o número do seu protocolo.\n⚠️ Atenção: o desbanimento não é garantido, pois o aviso foi previamente emitido. Ainda assim, sua solicitação será analisada. \n\nNúmero do protocolo: RC' + Math.floor(Math.random() * 100000));
            });
        }

        // Botão de reset (para desenvolvimento)
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('🔄  Resetar o banimento.\n\nEsta opção foi liberada pelo desenvolvedor lunot02.')) {
                    this.resetBan();
                }
            });
        }
    }

    resetBan() {
        // Remove dados do banimento
        localStorage.removeItem(this.banKey);
        localStorage.removeItem(this.banTimeKey);
        
        // Recarrega a página
        window.location.reload();
    }

    playBanSound() {
        try {
            // Cria um som de "erro" usando Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(100, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('🔇 Não foi possível reproduzir som de banimento');
        }
    }

    // Método para adicionar proteções extras
    addExtraProtections() {
        // Detecta tentativas de abrir DevTools
        let devtools = {
            open: false,
            orientation: null
        };

        const threshold = 160;

        setInterval(() => {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.triggerBan();
                }
            } else {
                devtools.open = false;
            }
        }, 500);

        // Detecta mudanças no console
        let consoleWarning = false;
        const originalLog = console.log;
        console.log = function() {
            if (!consoleWarning) {
                consoleWarning = true;
            let seguran = document.getElementById('security');
            seguran.style.display ="block"
            }
            return originalLog.apply(console, arguments);
        };
    }
}

function ok(){
    let seguran = document.getElementById('security');
 seguran.style.display = "none";
}

// Mensagens de aviso no console
console.log('%c🚫 ATENÇÃO! 🚫', 'color: red; font-size: 20px; font-weight: bold;');
console.log('%cEste site possui proteção anti right-click ativa!', 'color: orange; font-size: 14px;');
console.log('%cQualquer tentativa de usar o botão direito ou DevTools resultará em banimento!', 'color: red; font-size: 12px;');
console.log('%cProteções ativas: Right-click, F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J, Ctrl+U', 'color: orange; font-size: 11px;');
console.log('%c⚠️ Você foi avisado! ⚠️', 'color: red; font-size: 16px; font-weight: bold;');

// Inicializa o sistema quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando sistema de segurança...');
    
    // Cria instância do sistema de banimento
    const banSystem = new RightClickBanSystem();
    
    // Adiciona proteções extras após 2 segundos
    setTimeout(() => {
        banSystem.addExtraProtections();
        console.log('🛡️ Proteções extras ativadas!');
    }, 2000);
    
    // Mensagem de boas-vindas
    setTimeout(() => {
        if (localStorage.getItem('rightClickBanned') !== 'true') {
            console.log('✅ Sistema carregado com sucesso! Navegue com cuidado...');
        }
    }, 1000);
});

// Proteção contra reload rápido para tentar burlar o sistema
let reloadCount = parseInt(localStorage.getItem('reloadCount') || '0');
reloadCount++;
localStorage.setItem('reloadCount', reloadCount.toString());

if (reloadCount > 5) {
    console.log('🚨 Muitos reloads detectados! Comportamento suspeito...');
    // Poderia triggerar ban aqui também se quisesse ser mais rigoroso
}

// Limpa contador de reload após 1 minuto
setTimeout(() => {
    localStorage.removeItem('reloadCount');
}, 60000);

// Adiciona easter egg para usuários curiosos
console.log('%cEaster Egg: Digite "liberdade" no console para uma surpresa! 🎉', 'color: purple; font-style: italic;');

// Função easter egg
window.liberdade = function() {
    console.log('%c🎉 PARABÉNS! 🎉', 'color: gold; font-size: 24px; font-weight: bold;');
    console.log('%cVocê encontrou o easter egg!', 'color: green; font-size: 16px;');
    console.log('%cMas isso não vai te salvar do banimento se usar as teclas proibidas! 😈', 'color: red; font-size: 14px;');
    
    // Efeito visual especial
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Remove efeito após 5 segundos
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
    
    // Adiciona CSS para efeito rainbow
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
};