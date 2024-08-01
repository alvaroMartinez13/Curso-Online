var curso = [{
    id_curso: 1,
    nombre: "Javascript",
    portada: "https://oracle-devrel.github.io/devo-image-repository/seo-thumbnails/JavaScript---Thumbnail-1200-x-630.jpg",
    descripcion: "Curso de JavaScript para iniciantes",
    contenido: "Fundamentos de Javascript, Javascript básico, Javascript avanzado"
},
{
    id_curso: 2,
    nombre: "Python",
    portada: "https://www.unite.ai/wp-content/uploads/2022/04/AI-Python-Libraries.png",
    descripcion: "Curso de Python para iniciantes",
    contenido: "Fundamentos de Python, Python básico, Python avanzado"
},
{
    id_curso: 3,
    nombre: "Java",
    portada: "https://www.mytaskpanel.com/wp-content/uploads/2023/04/consulting-blog-09.webp",
    descripcion: "Curso de Java para iniciantes",
    contenido: "Fundamentos de Java, Java básico, Java avanzado"
},
{
    id_curso: 4,
    nombre: "C++",
    portada: "https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_CPP.jpg",
    descripcion: "Curso de C++ para iniciantes",
    contenido: "Fundamentos de C++, C++ básico, C++ avanzado"
}
]

const usuario = {
    nombre: "Juan Diego",
    edad: 25,
    cursos: [1, 3]
}


window.addEventListener('load', async function () {
    let j = 0;
    const cursos = await cargarDatosCursos();
    localStorage.setItem("Usuario", usuario.nombre);
    document.getElementById("nombre_user").textContent = usuario.nombre;
    for (let i = 0; i < usuario.cursos.length; i++) {
        j = +i + 1;
        const curso = cursos.find(curso => curso.id_curso === usuario.cursos[i]);
        this.sessionStorage.setItem("Curso " + j, curso.nombre);
    }
    visualizaCursos();
});

const cargarDatosCursos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (curso.length == 0) {
                reject(new Error("No hay datos"))
            } else {
                resolve(curso)
            }
        }, 2000);
    });
}

const visualizaCursos = async () => {
    try {
        let cursosDisponibles = "";
        let cursosPropios = "";
        let j = 0;
        let divs = [];

        const cursos = await cargarDatosCursos();

        for (let i = 0; i < cursos.length; i++) {
            j = i + 1;
            const curso = sessionStorage.getItem("Curso " + i);

            if (curso !== null) {
                console.log(curso)
                if(cursos[i].nombre == curso){
                    cursosPropios+= `
                <div class="card">

                    <img src="${cursos[i].portada}" alt="${cursos[i].nombre}">
                    <div class="contenido">
                        <h2>${cursos[i].nombre}</h2>
                        <p>${cursos[i].descripcion}</p>
                        <p>${cursos[i].contenido}</p>
                    </div>    
                </div>
                    `;
                }

                
            }

        }

        document.getElementById("seccion_cursos_propios").innerHTML =  cursosPropios;

        for (let i = 0; i < cursos.length; i++) {
            cursosDisponibles += `
            <div class="card">
            <img src="${cursos[i].portada}" alt="${cursos[i].nombre}">
                <div class="contenido">
                    <h2>${cursos[i].nombre}</h2>
                    <p>${cursos[i].descripcion}</p>
                    <p>${cursos[i].contenido}</p>
                </div>  
            </div>
            `;
        }
        document.getElementById("seccion_cursos_disponibles").innerHTML = cursosDisponibles;
    } catch (error) {

    }
}

async function cargarCurso(nombre) {
    try {
        const cursos = await cargarDatosCursos()

        for (let curso of cursos) {
            if (curso.nombre == nombre) {
                return curso;
            }
        }

    } catch (error) {
        console.log(error)
    }
}

async function agregarCurso({ nombre, descripcion, contenido }) {
    try {
        const cursos = await cargarDatosCursos();
        const nuevocurso = {
            id_curso: cursos.length + 1,
            nombre: nombre,
            descripcion: descripcion,
            contenido: contenido
        }
        cursos.push(nuevocurso)
        console.log(cursos)
    } catch (error) {
        console.log(error)
    }
}

async function editarCurso({ nombre, descripcion, contenido }) {
    try {
        const cursos = await cargarDatosCursos();
        for (let curso of cursos) {
            if (curso.nombre == nombre) {
                curso.descripcion = descripcion;
                curso.contenido = contenido;
                console.log(cursos)
                return curso;
            }
        }
    } catch (error) {
        console.log(error)
    }
}

async function eliminaCurso(nombre) {
    try {
        const cursos = await cargarDatosCursos();
        for (let curso of cursos) {
            if (curso.nombre == nombre) {
                const indice = cursos.indexOf(curso);
                cursos.splice(indice, 1);
                console.log(cursos)
                return cursos;
            }
        }
    } catch (error) {
        console.log(error)
    }
}





