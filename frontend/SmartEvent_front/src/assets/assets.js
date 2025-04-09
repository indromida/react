import logo from './logo.png'
import search_icon from './search_icon.png'
import event1 from './event1.jpg'
import event2 from './event2.jpg'
import event3 from './event3.jpg'
import Category1 from './category1.jpg'
import Category2 from './category2.jpg'
import Category3 from './category3.jpg'
import Category4 from './category4.jpg'
import Category5 from './category5.jpg'
import Category6 from './category6.jpg'



export const assets = {
    logo,
    search_icon,
    event1,
    event2,
    event3,
    
}

export const event_list = [
    {
        id: 1, // Unique ID for the event
        "event-img": event1,
        "event-title": "Event 1",
        "event-description": "Description for Event 1",
        "event-category": "Tech"
    },
    {
        id: 2, // Unique ID for the event
        "event-img": event2,
        "event-title": "Event 2",
        "event-description": "Description for Event 2",
        "event-category": "Gaming"
    },
    {
        id: 3, // Unique ID for the event
        "event-img": event3,
        "event-title": "Event 3",
        "event-description": "Description for Event 3",
        "event-category": "Art"
    }
];

export const categories_list = [
    {
        "category-img": Category1,
        "category-title": "Tech"
    },
    {
        "category-img": Category2,
        "category-title": "Art"
    },
    {
        "category-img": Category3,
        "category-title": "Education"
    },
    {
        "category-img": Category4,
        "category-title": "Gaming"
    },
    {
        "category-img": Category5,
        "category-title": "Social Impact"
    },
    {
        "category-img": Category6,
        "category-title": "Business"
    },
]

