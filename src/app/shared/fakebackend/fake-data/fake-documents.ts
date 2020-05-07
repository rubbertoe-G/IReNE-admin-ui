import { DocumentMeta } from '../../models/documents.model';
import { CreationMeta } from '../../models/creation.model';
import { Document } from '../../models/documents.model';
export const fakeDocuments: DocumentMeta[] = [
  {_id: '5ea651b31b1201f6a6c1b254', title:'La gran inundacion del 2010.', creator: 'Roberto Guzman', published: true},
  {_id: '5ea651b31b1201f6a6c1b254', title:'Pasteles con Ketchup', creator: 'Roberto Guzman', published: false},
  {_id: '5ea651b31b1201f6a6c1b254', title:'Temblores de 2020: Causa y Efecto.', creator: 'Yomar Ruiz', published: true},
  {_id: '5ea651b31b1201f6a6c1b254', title:'Huracán Maria: 5 años despues.', creator: 'Alberto Canela', published: false},
  {_id: '5ea651b31b1201f6a6c1b254', title:'Inestabil_idad Ferroviaria: Análisis técnico y monetario.', creator: 'Alejandro Vasquez', published: true},
  {_id: '5ea651b31b1201f6a6c1b254', title:'Si este titulo tiene mas de 80 caracteres se supone que hayan tres puntitos al final en la tabla.', creator: 'Pepe Figueroa', published: true},
  {_id: '5ea6518a9c9a794cd0243d39', title:'Damage to roads cause by earthquake in Yauco', creator: 'Yomar Ruiz', published: true},
  {_id: '5ea651b31b1201f6a6c1b254', title:'Damage to Housing cause by earthquake in Yauco', creator: 'Dante Alighieri', published: true},
  {_id: '5ea651d290dde5224efba7a9', title:'Public Infrastructure Damage Caused by Hurricane Maria', creator: 'Friedrich Nietzsche', published: true}
]


export const fakeViewDocuments: Document[] = [

  {
  _id: "5ea651b31b1201f6a6c1b254", 
  title: "Damage to Housing cause by earthquake in Yauco", 
  description: "this is a test", 
  creatorFullName: "Dante Alighieri",
  creatorEmail: "dante.alighieri@upr.edu",
  creationDate: "2000-04-03", 
  lastModificationDate: "2020-02-26", 
  incidentDate: "2017-09-21", 
  tagsDoc: ["tag1", "tag2", "tag3", "tag4"], 
  infrasDocList: ["infrastrucutre1", "infrastructure2", "infrastructure3"], 
  damageDocList: ["damage1", "damage2", "damage3", "damage4"], 
  author: [{
    author_FN: "Sancho",
    author_LN: "Panza",
    author_email: "Sancho@Panza.com",
    author_faculty: "INEL"
},{
            author_FN: "Don",
            author_LN: "Quijote",
            author_email: "Don@Quijote.com",
            author_faculty: "INEL"
        }], 
  actor: [{
    actor_FN: "Don",
    actor_LN: "Quijote",
    role: "Advisor"
}], 
  section: [{secTitle: "Section 1", content: "<p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore assumenda expedita ducimus nemo officiis cum nam recusandae, est omnis similique aliquam, quaerat aperiam tempore, eligendi nulla architecto hic minima labore?</p>"},
  {secTitle: "Section 2", content: "<p> This is an old description of a senction content for test...</p>"}] 

  }
]

//   {
//   _id: "5ea6518a9c9a794cd0243d39", 
//   title: "Damage to roads cause by earthquake in Yauco", 
//   description: "this is a test", 
//   incidentDate: "2020-02-15", 
//   creationDate: "2000-04-26", 
//   tagsDoc: [], 
//   infrasDocList: ["infrastructure1", "infrastructure2", "infrastructure3"], 
//   damageDocList: [], 
//   author: [{
//     author_FN: "Sancho",
//     author_LN: "Panza",
//     author_email: "Sancho@Panza.com",
//     author_faculty: "INEL"
// }], 
//   actor: [{
//     actor_FN: "Dulcinea",
//     actor_LN: "Del Toboso",
//     role: "Advisor"
// },
// {
// actor_FN: "Sancho",
// actor_LN: "Panza",
// role: "Advisor"
// }], 
//   section: []
//   },

  // },

  // {
  // _id: "5ea651d290dde5224efba7a9", 
  // creatoriD: "5ea651da6a1115b76cd8d6a8", 
  // title: "Public Infrastructure Damage Caused by Hurricane Maria", 
  // language: "English", 
  // description: "Test data for Public Infrastructure Damage Caused by Hurricane Maria ", 
  // published: true, 
  // incidentDate: "2017-09-21", 
  // creationDate: "2000-04-26", 
  // lastModificationDate: "2020-04-26", 
  // tagsDoc: [], 
  // infrasDocList: ["infrastrucutre1", "infrastructure2", "infrastructure3"], 
  // damageDocList: [], 
  // author: [], 
  // actor: [], 
  // section: []
  // }