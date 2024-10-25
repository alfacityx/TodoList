const button = document.querySelector("#addTextarea"); // Butonu seçin
const textareaContainer = document.getElementById("Todo"); // Textarea'ların ekleneceği konteyner
const containers = document.querySelectorAll(".card-body");
const alertContainer = document.getElementById("alert-container"); // Uyarı mesajları için alan

button.addEventListener("click", function (e) {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    // Input alanından değer al
    const todoInput = document.getElementById("todo-input");
    const todoText = todoInput.value.trim(); // Girdiyi al ve boşlukları temizle

    // Eğer input boşsa uyarı mesajı ver
    if (!todoText) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger d-flex align-items-center';
        alertDiv.innerHTML = `
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                <use xlink:href="#exclamation-triangle-fill"/>
            </svg>
                ToDo Kısmı Boş Bırakılamaz!
            </div>`;
        
        alertContainer.appendChild(alertDiv); // Uyarı mesajını ekle
        setTimeout(() => {
            alertContainer.removeChild(alertDiv); // Uyarıyı kaldır
        }, 3000);
        return; 
    }

    // Eğer input boş değilse
    if (todoText) {
        // Yeni bir div oluştur
        const todoItem = document.createElement('div');
        
        // To Do kartına ekle
        textareaContainer.appendChild(todoItem);
        
        // Inputu temizle
        todoInput.value = '';

        // Yeni bir textarea oluştur
        const textarea = document.createElement("textarea");
        textarea.classList.add("form-control", "mb-2"); // Alanların altına biraz boşluk bırak
        textarea.value = todoText; // Textarea'ya metni ekle
        textarea.style.resize = "none";

        const container = document.createElement("div");
        container.classList.add("d-flex", "align-items-center");
        container.draggable = true; // Sürüklenebilir yapıyoruz
        container.id = "container-" + Math.floor(Math.random() * 100); // Her container'a rastgele ID veriyoruz
        
        // Çöp ikonu oluştur
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fas", "fa-trash-alt", "ms-2"); // Font Awesome ikonu, biraz boşluk ve kırmızı renk
        trashIcon.style.cursor = "pointer"; // Üzerine gelindiğinde el işareti olsun
        
        // Çöp ikonuna tıklayınca silme işlemi
        trashIcon.addEventListener("click", () => {
            let increaseHeight = textareaContainer.clientHeight-container.clientHeight;
            containers.forEach(container => {
                container.style.height = increaseHeight + "px"; 
            });
            container.remove(); // Textarea ve ikonun bulunduğu container'ı sil
            
        });

        // Textarea ve çöp ikonunu container'a ekle
        container.appendChild(textarea);
        container.appendChild(trashIcon);

        // Sürükleme işlemleri için event listener'lar (container üzerinden)
        container.addEventListener("dragstart", onDragStart);
        container.addEventListener("dragend", onDragEnd);

        // Container'ı To Do alanına ekle
        textareaContainer.appendChild(container);

        // Artırılacak yükseklik
        let increaseHeight = textarea.clientHeight + textareaContainer.clientHeight;
        containers.forEach(container => {
            container.style.height = increaseHeight + "px"; 
        });
    }
});

// Sürükleme fonksiyonları (container üzerinden)
function onDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id); // Sürüklenen container'ın ID'sini ayarla
}

function onDragEnd(e) {
    // Drag işlemi bittikten sonra yapılacak işlemler
}

// Tüm kart içeriklerini seç
containers.forEach(container => {
    container.addEventListener("dragover", function (e) {
        e.preventDefault(); // Varsayılan davranışı engelle
    });

    container.addEventListener("drop", function (e) {
        e.preventDefault();

        // Sürüklenen container'ın ID'sini al
        const containerID = e.dataTransfer.getData("text/plain");
        const draggedContainer = document.getElementById(containerID); // ID'ye göre container'ı seçin

        if (draggedContainer && e.target.id === container.id) {
            // Eğer drag edilen öğe geçerli bir konteynere bırakılmışsa
            e.target.appendChild(draggedContainer); // Bırakılan alana container'ı ekleyin
        }
    });
});

