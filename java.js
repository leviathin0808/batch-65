let dataProject = [];

function addProject(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let startDate = document.getElementById("star-date").value;
    let endDate = document.getElementById("end-date").value;
    let description = document.getElementById("description").value;
    let imageInput = document.getElementById("image");

    let image = "";
    if (imageInput.files.length > 0) {
        image = URL.createObjectURL(imageInput.files[0]);
    } else {
        image = "https://via.placeholder.com/700x400.png?text=Project+Image";
    }

    let nodejs = document.getElementById("tech-nodejs").checked;
    let reactjs = document.getElementById("tech-reactjs").checked;
    let nextjs = document.getElementById("tech-nextjs").checked;
    let typescript = document.getElementById("tech-typescript").checked;

    let project = {
        name,
        startDate,
        endDate,
        description,
        image,
        nodejs,
        reactjs,
        nextjs,
        typescript
    };

    dataProject.push(project);
    renderProject();
}

function renderProject() {
    let projectContainer = document.getElementById("projects");
    projectContainer.innerHTML = "";

    dataProject.forEach((data) => {
        projectContainer.innerHTML += `
        <div class="card mb-3 w-100 shadow-sm">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${data.image}" class="img-fluid rounded-start" alt="project image" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="text-muted">Durasi: ${getDuration(data.startDate, data.endDate)}</p>
                        <p class="card-text">${data.description}</p>
                        <div class="mb-3 text-secondary">
                            ${data.nodejs ? '<i class="fab fa-node-js fa-2x me-2"></i>' : ''}
                            ${data.reactjs ? '<i class="fab fa-react fa-2x me-2"></i>' : ''}
                            ${data.nextjs ? '<i class="fab fa-vuejs fa-2x me-2"></i>' : ''}
                            ${data.typescript ? '<i class="fab fa-js-square fa-2x me-2"></i>' : ''}
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-dark">Edit</button>
                            <button class="btn btn-dark">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
}

function getDuration(start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end);
    
    let timeDiff = endDate - startDate;
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);

    if (days < 30) {
        return days + " Hari";
    } else if (months < 12) {
        return months + " Bulan";
    } else {
        return years + " Tahun";
    }
}