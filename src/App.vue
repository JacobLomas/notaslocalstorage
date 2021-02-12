<template>
  <div id="app">
    
    <div class="inputs">
      
      <input @keyup.enter="crearNota" v-model="texto" type="text" name="name" class="question" id="nta" required autocomplete="off" />
      <label for="nta"><span>Nuevo </span></label>
      
      <input v-model="filtro" type="text" name="name" class="question" id="fltr" required autocomplete="off" />
      <label for="fltr"><span>Filtrar</span></label>
      <h4>{{tareasPendientes}} pendientes de {{totalTareas}} || <span class="borrarCompletados" @click="borrarTareasCompletadas" title="Borra las tareas completadas"><i class="far fa-times-circle"></i> Borrar tareas completadas</span></h4>
    </div>
    <section class="notas">
      <nota v-for="(nota, index) in listaRecordatoriosFiltrada" :key="index" :nota="nota"
          @cambioEnEstado="actualizarStorage"
          @borrarNota="borrarNota(index)"
      />
    </section>
    <footer> <small style="color:wheat">&copy; Copyright 2020, Jacob Lomas Álvarez</small> </footer> 
    
  </div>
</template>

<script>
import nota from './components/nota/nota.vue'
export default {
  name: 'App',
  mounted(){
    if(localStorage.listaTareas)
      this.listaRecordatorios=JSON.parse(localStorage.listaTareas);
  },

  data(){
    return{
      texto:"",
      filtro:"",
      listaRecordatorios:[],
      documents:[]
    }
  },
  methods:{
    crearNota(){
      this.listaRecordatorios.push({
        titulo: this.texto,
        fechaCreacion: Date.now(),
        prioridad:0,
        completado:false
      });
      this.actualizarStorage();
      this.texto=""
    },
    actualizarStorage(){
      localStorage.listaTareas=JSON.stringify(this.listaRecordatorios)
    },
    borrarTareasCompletadas(){
      this.listaRecordatorios=this.listaRecordatorios.filter((caca)=>{
          return !caca.completado
      })
      this.actualizarStorage();
    },
    borrarNota(index){
      this.listaRecordatorios.splice(index,1);
      this.actualizarStorage();
    },
  },
  computed:{
    totalTareas(){
      return this.listaRecordatorios.length
    },
    tareasPendientes(){
      let cont=0;
      for(let recordatorio of this.listaRecordatorios){
        if(!recordatorio.completado)
            cont++
      }
      return cont;
    },
    listaRecordatoriosFiltrada(){
      var lista;
      if(this.filtro.length==0)
          lista= this.listaRecordatorios;
      else{
          lista = this.listaRecordatorios.filter((recordatorio)=>{
              return recordatorio.titulo.indexOf(this.filtro)>=0;
          });
      }      
      lista=lista.sort((recordatorio1, recordatorio2)=>{
          if(recordatorio1.prioridad<recordatorio2.prioridad)
              return 1;
          else
              return -1;
      })
      return lista 
    }
  },
  components: {
    nota
  },
  
}
</script>

<style>
body{
  background-color: rgb(82, 82, 82);
  color: wheat;
}
h4{
  text-align: left;
  color: wheat;
}
.borrarCompletados{
  color: lightcoral;
  cursor: pointer;
}
.notas, .inputs{
  width: 100%;
  margin: auto;
}
.notas{
  border: 3px solid rgba(128, 128, 128, 0.616);
}
input,
label {
  font-family: 'Ubuntu', sans-serif;
  display: block;
  margin: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: none;
  font-size: 1rem;
}

input:focus {
  outline: 0;
}
/* Question */

input.question {
  color: wheat;
  font-size: 48px;
  font-weight: 300;
  border-radius: 2px;
  margin: 0;
  border: none;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  transition: padding-top 0.2s ease, margin-top 0.2s ease;
  overflow-x: hidden; /* Hack to make "rows" attribute apply in Firefox. */
}
/* Underline and Placeholder */

input.question + label {
  display: block;
  position: relative;
  white-space: nowrap;
  padding: 0;
  margin: 0;
  width: 10%;
  border-top: 1px solid wheat;
  color: wheat;
  -webkit-transition: width 0.4s ease;
  transition: width 0.4s ease;
  height: 0px;
}

input.question:focus + label {
  width: 80%;
}

input.question:focus,
input.question:valid {
  padding-top: 35px;
}


input.question:focus + label > span,
input.question:valid + label > span {
  top: -100px;
  font-size: 2rem;
  color: wheat;
}

textarea.question:focus + label > span {
  top: -150px;
  font-size: 2rem;
  color: wheat;
}


input.question:invalid {
  box-shadow: none;
}

input.question + label > span {
  font-weight: 300;
  margin: 0;
  position: absolute;
  color: wheat;
  font-size: 48px;
  top: -66px;
  left: 0px;
  z-index: -1;
  -webkit-transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;
  transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;
}


@-webkit-keyframes appear {
  100% {
    opacity: 1;
  }
}

@keyframes appear {
  100% {
    opacity: 1;
  }
}

@media(min-width: 578px){
 .notas, .inputs{
  width: 70vw;
  } 
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
