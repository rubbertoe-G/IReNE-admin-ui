import { CreationMeta } from '../../models/creation.model';
import { Hist, Rev } from '../../models/fakeHist.model';
import { DescriptionMeta } from '../../models/description.model';
import { TitleMeta } from '../../models/title.model';
import { TimelineMeta } from '../../models/timeline.model';
import { SectionMeta, SectionMetaDOC } from '../../models/section.model';
import { InfrastructureMeta } from '../../models/infrastructure.model';
import { DamageMeta } from '../../models/damage.model';
import { LocationMeta } from '../../models/location.modal';
import { TagMetaDOC } from '../../models/tags.model';
import { IncidentMeta } from '../../models/incident.model';
import { AuthorMeta, AuthorMetaDOC } from '../../models/author.model';
import { ActorMeta, ActorMetaDOC } from '../../models/actor.model';


const creation: CreationMeta[] = [
    {
    _id: {$oid: "5ea6518a9c9a794cd0243d39"}, 
    creatoriD: "5ea65196542fd4f6895b8224", 
    title: "Damage to roads cause by earthquake in Yauco", 
    language: "English", 
    location: [], 
    description: "this is a test", 
    published: true, 
    incidentDate: "2020-02-15", 
    creationDate: "2000-04-26", 
    lastModificationDate: "2020-04-26", 
    tagsDoc: [], 
    infrasDocList: ["infrastrucutre1", "infrastructure2", "infrastructure3"], 
    damageDocList: [], 
    author: [], 
    actor: [], 
    section: [], 
    timeline: []
    },
    {
    _id: {$oid: "5ea651b31b1201f6a6c1b254"}, 
    creatoriD: "5ea651bd3cdecc0f0b1e77ec", 
    title: "Damage to Housing cause by earthquake in Yauco", 
    language: "English", 
    location: [], 
    description: "this is a test", 
    published: true, 
    incidentDate: "2020-01-15", 
    creationDate: "2000-04-03", 
    lastModificationDate: "2020-02-26", 
    tagsDoc: [], 
    infrasDocList: ["infrastrucutre1", "infrastructure2", "infrastructure3"], 
    damageDocList: [], 
    author: [], 
    actor: [], 
    section: [], 
    timeline: []
    },

    {
    _id: {$oid: "5ea651d290dde5224efba7a9"}, 
    creatoriD: "5ea651da6a1115b76cd8d6a8", 
    title: "Public Infrastructure Damage Caused by Hurricane Maria", 
    language: "English", 
    location: [], 
    description: "Test data for Public Infrastructure Damage Caused by Hurricane Maria ", 
    published: true, 
    incidentDate: "2017-09-21", 
    creationDate: "2000-04-26", 
    lastModificationDate: "2020-04-26", 
    tagsDoc: [], 
    infrasDocList: ["infrastrucutre1", "infrastructure2", "infrastructure3"], 
    damageDocList: [], 
    author: [], 
    actor: [], 
    section: [], 
    timeline: []
    }

]

const actor: ActorMetaDOC[] = [
    {
        new:
        {
            actor_FN: "Sancho",
            actor_LN: "Panza",
            role: "Advisor"
        },
        old:
        {
            actor_FN: "Don",
            actor_LN: "Quijote",
            role: "Advisor"
        }
    },
    {
        new:
        {
            actor_FN: "Sancho",
            actor_LN: "Panza",
            role: "Advisor"
        },
        old:
        {
            actor_FN: "Dulcinea",
            actor_LN: "Del Toboso",
            role: "Advisor"
        }
    },
    {
        new:
        {
            actor_FN: "Dulcinea",
            actor_LN: "Del Toboso",
            role: "Advisor"
        },
        old:
        {
            actor_FN: "Don",
            actor_LN: "Quijote",
            role: "Advisor"
        }
    }
]

const author: AuthorMetaDOC[] = [
    {
        new:
        {
            author_FN: "Sancho",
            author_LN: "Panza",
            author_email: "Sancho@Panza.com",
            author_faculty: "INEL"
        },
        old:
        {
            author_FN: "Don",
            author_LN: "Quijote",
            author_email: "Don@Quijote.com",
            author_faculty: "INEL"
        }
    },
    {
        new:
        {
            author_FN: "Sancho",
            author_LN: "Panza",
            author_email: "Sancho@Panza.com",
            author_faculty: "INEL"
        },
        old:
        {
            author_FN: "Dulcinea",
            author_LN: "Del Toboso",
            author_email: "Dulcinea@email.com",
            author_faculty: "CIIC"
        }
    },
    {
        new:
        {
            author_FN: "Dulcinea",
            author_LN: "Del Toboso",
            author_email: "Dulcinea@email.com",
            author_faculty: "CIIC"
        },
        old:
        {
            author_FN: "Don",
            author_LN: "Quijote",
            author_email: "Don@Quijote.com",
            author_faculty: "INEL"
        }
    }
]

const incident: IncidentMeta[] = [
    {
        new: "2013-07-21",
        old: "2012-02-01"
    },

    {
        new: "2013-04-09",
        old: "2012-02-01"
    },

    {
        new: "2011-12-01",
        old: "2009-03-01"
    }
]

const tag: TagMetaDOC[] = [
    {
        new: ["tag1", "tag2", "tag3", "tag4"],
        old: []
    },

    {
        new: ["tag5", "tag6", "tag7", "tag8"],
        old: ["tag1", "tag2", "tag3", "tag4"]
    },

    {
        new: [],
        old: ["tag1", "tag2", "tag3", "tag4"]
    }
]

const location: LocationMeta[] = [
    {
        new: ["location1", "location2", "location3", "location4"],
        old: []
    },

    {
        new: ["location5", "location7", "location8", "location9"],
        old: ["location1", "location2", "location3", "location4"]
    },

    {
        new: [],
        old: ["location1", "location2", "location3", "location4"]
    }
]

const damage: DamageMeta[] = [
    {
        new: ["damage1", "damage2", "damage3", "damage4"],
        old: []
    },

    {
        new: ["damage5", "damage6", "damage7", "damage8"],
        old: ["damage1", "damage2", "damage3", "damage4"]
    },

    {
        new: ["damage7"],
        old: ["damage1", "damage2", "damage3", "damage4"]
    }
]

const infrastructure: InfrastructureMeta[] = [
    {
        new: ["type1", "type2", "type3", "type4"],
        old: []
    },

    {
        new: ["infra2", "infra3", "infra4", "infra5"],
        old: ["type1", "type2", "type3", "type4"]
    },

    {
        new: ["infra9"],
        old: ["infra21", "infra31", "infra41", "infra51"]
    }
]


const section: SectionMetaDOC[] = [
    {
        new: {secTitle: "Section 2", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore assumenda expedita ducimus nemo officiis cum nam recusandae, est omnis similique aliquam, quaerat aperiam tempore, eligendi nulla architecto hic minima labore?"}, 
        old: {secTitle: null, content: null}
    },

    {
        new: {secTitle: "Section 3", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore assumenda expedita ducimus nemo officiis cum nam recusandae, est omnis similique aliquam, quaerat aperiam tempore, eligendi nulla architecto hic minima labore?"},
        old: {secTitle: "Section 2", content: "This is an old description of a senction content for test..."}
    
    },

    {
        new: {secTitle: null, content: null},
        old: {secTitle: "Section 3", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore assumenda expedita ducimus nemo officiis cum nam recusandae, est omnis similique aliquam, quaerat aperiam tempore, eligendi nulla architecto hic minima labore?"}
    }
]

const timeline: TimelineMeta[] = [
    {
        new: [
            {event: "New timeline event1", eventEndDate: "2019-09-29", eventStartDate: "2017-02-13"}, 
            {event: "New timeline event2", eventEndDate: "2019-09-29", eventStartDate: "2017-02-13"}
        ], 
        old: []
    },

    {
        new: [
            {event: "New timeline event3", eventEndDate: "2017-09-29", eventStartDate: "2015-02-13"}
        ], 
        old: [
            {event: "Old timeline event1", eventEndDate: "2015-09-29", eventStartDate: "2013-02-13"},
            {event: "Old Timeline event2", eventEndDate: "2015-09-29", eventStartDate: "2013-02-13"}
        ]
    },

    {
        new: [], 
        old: [
            {event: "I am the old event description1", eventEndDate: "2017-09-29", eventStartDate: "2015-02-13"}, 
            {event: "I am the old event description2", eventEndDate: "2017-09-29", eventStartDate: "2015-02-13"}
        ]
    }
]

const title: TitleMeta[] = [
    {
        new: 'Damage to roads cause by earthquake in Yauco',
        old: 'Title of document: This is a test'
    },
    {
        new: 'Damage to Housing cause by earthquake in Yauco',
        old: 'This is a title: Hello World!'
    },
    {
        new: 'Public Infrastructure Damage Caused by Hurricane Maria',
        old: 'This is a document title'
    }
]

const description: DescriptionMeta[] = [
    {
        new: 'New description of document',
        old: 'Old description of document'
    },
    {
        new: 'New description of document for test',
        old: ''
    },
    {
        new: 'Test New description of document',
        old: 'Test Old description of document'
    }
]

const revisionsTest: Rev[] = [
    {
        revDate: "2000-04-26",
        revType: "Creation",
        fields: creation[0]
    },
    {
        revDate: "2000-04-03",
        revType: "Creation",
        fields: creation[1]
    },
    {
        revDate: "2000-04-26",
        revType: "Creation",
        fields: creation[2]
    },

//descriptions
    {
        revDate: "2002-04-28",
        revType: "Description",
        fields: description[0]
    },
    {
        revDate: "2009-04-30",
        revType: "Description",
        fields: description[1]
    },
    {
        revDate: "2010-05-01",
        revType: "Description",
        fields: description[2]
    },

//titles
    {
        revDate: "2002-04-30",
        revType: "Title",
        fields: title[0]
    },
    {
        revDate: "2009-05-02",
        revType: "Title",
        fields: title[1]
    },
    {
        revDate: "2010-05-03",
        revType: "Title",
        fields: title[2]
    },

//timelines
    {
        revDate: "2002-04-30",
        revType: "Timeline",
        fields: timeline[0]
    },
    {
        revDate: "2009-05-02",
        revType: "Timeline",
        fields: timeline[1]
    },
    {
        revDate: "2010-05-03",
        revType: "Timeline",
        fields: timeline[2]
    },

//Sections
    {
        revDate: "2002-05-30",
        revType: "Section",
        fields: section[0]
    },
    {
        revDate: "2009-06-02",
        revType: "Section",
        fields: section[1]
    },
    {
        revDate: "2010-06-03",
        revType: "Section",
        fields: section[2]
    },

//Infrastruture
    {
        revDate: "2002-06-30",
        revType: "Infrastruture",
        fields: infrastructure[0]
    },
    {
        revDate: "2009-07-02",
        revType: "Infrastruture",
        fields: infrastructure[1]
    },
    {
        revDate: "2010-07-03",
        revType: "Infrastruture",
        fields: infrastructure[2]
    },

//Damage
    {
        revDate: "2002-06-30",
        revType: "Damage",
        fields: damage[0]
    },
    {
        revDate: "2009-07-02",
        revType: "Damage",
        fields: damage[1]
    },
    {
        revDate: "2010-07-03",
        revType: "Damage",
        fields: damage[2]
    },

//Location
    {
        revDate: "2002-07-30",
        revType: "Location",
        fields: location[0]
    },
    {
        revDate: "2009-08-02",
        revType: "Location",
        fields: location[1]
    },
    {
        revDate: "2010-09-03",
        revType: "Location",
        fields: location[2]
    },

//Tag
    {
        revDate: "2002-07-30",
        revType: "Tag",
        fields: tag[0]
    },
    {
        revDate: "2009-08-02",
        revType: "Tag",
        fields: tag[1]
    },
    {
        revDate: "2010-09-03",
        revType: "Tag",
        fields: tag[2]
    },

//Incident
    {
        revDate: "2002-07-30",
        revType: "Incident Date",
        fields: incident[0]
    },
    {
        revDate: "2009-08-02",
        revType: "Incident Date",
        fields: incident[1]
    },
    {
        revDate: "2010-09-03",
        revType: "Incident Date",
        fields: incident[2]
    },

//Author
    {
        revDate: "2002-08-20",
        revType: "Author",
        fields: author[0]
    },
    {
        revDate: "2009-09-12",
        revType: "Author",
        fields: author[1]
    },
    {
        revDate: "2010-10-23",
        revType: "Author",
        fields: author[2]
    },

//Actor
    {
        revDate: "2002-09-30",
        revType: "Actor",
        fields: actor[0]
    },
    {
        revDate: "2009-10-17",
        revType: "Actor",
        fields: actor[1]
    },
    {
        revDate: "2010-11-27",
        revType: "Actor",
        fields: actor[2]
    }
]

export const fakeHist: Hist[] = [
    {
        _id: '5ea66cfa9407714f1fc81911',
        creatorId: "5ea65196542fd4f6895b8224",
        docId: "5ea6518a9c9a794cd0243d39",
        revisions: [revisionsTest[0], revisionsTest[3], revisionsTest[6], revisionsTest[9], revisionsTest[12], revisionsTest[15], revisionsTest[18], revisionsTest[21], revisionsTest[24], revisionsTest[27], revisionsTest[30], revisionsTest[33]]
    },
    {
        _id: '5ea66d046985cfe4de0dfb0f',
        creatorId: "5ea651bd3cdecc0f0b1e77ec",
        docId: "5ea651b31b1201f6a6c1b254",
        revisions: [revisionsTest[1], revisionsTest[4], revisionsTest[7], revisionsTest[10], revisionsTest[13], revisionsTest[16], revisionsTest[19], revisionsTest[22], revisionsTest[25], revisionsTest[28], revisionsTest[31], revisionsTest[34]]
    },
    {
        _id: '5ea66d118159a24ab2c20f0a',
        creatorId: "5ea651da6a1115b76cd8d6a8",
        docId: "5ea651d290dde5224efba7a9",
        revisions: [revisionsTest[2], revisionsTest[5], revisionsTest[8], revisionsTest[11], revisionsTest[14], revisionsTest[17], revisionsTest[20], revisionsTest[23], revisionsTest[26], revisionsTest[29], revisionsTest[32], revisionsTest[35]]
    }
]




// {revDate: "2020-04-26", 
// revType: "Creation", 
// fields: 
// {_id: {$oid: "5ea626b0c5bcd1a5cb4d864d"}, 
// creatoriD: "5ea6269bc5bcd1a5cb4d8648", 
// title: "Some Title121", 
// language: "English", 
// location: [], 
// description: "this is a test", 
// published: true, 
// incidentDate: "2020-02-15", 
// creationDate: "2020-04-26", 
// lastModificationDate: "2020-04-26", 
// tagsDoc: [], 
// infrasDocList: ["infrastrucutre1", "infrastructure2", "infrastructure3"], 
// damageDocList: [], 
// author: [], 
// actor: [], 
// section: [], 
// timeline: []
// }
// }
