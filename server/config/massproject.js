import mongoose from 'mongoose';
import projectModel from '../models/projectModel.js';

// const projects = [
//     {
//         userId: "6777d0acc916ba93f8fd72cf",
//         name: "om verma",
//         email:"g22.om.verma@gnkhalsa.edu.in",
//         iscompleted:"true",
//         rollno: 404,//477
//         title: "ABCDEF",
//         description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//         category: "Web Development",
//         deployed: "http://localhost:5173/",
//         batch:"Batch2",
//         year:"2024-2025",//2025-2026
//         department:"IT",//IT
//         project: "Project Two",//Project One
//         github: "http://localhost:5173/"
//     },
//     {
//         userId: "6777d0acc916ba93f8fd72de",
//         name: "aditya misra",
//         email:"g22.aditya.mishra@gnkhalsa.edu.in",
//         iscompleted:"true",
//         rollno: 444,//477
//         title: "ABCDEF",
//         description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//         category: "Web Development",
//         deployed: "http://localhost:5173/",
//         batch:"Batch3",
//         year:"2024-2025",//2025-2026
//         department:"CS",//IT
//         project: "Project Two",//Project One
//         github: "http://localhost:5173/"
//     },
//     {
//         userId: "6777d0acc916ba93f8fd72e3",
//         name: "aarav khan",
//         email:"g22.aarav.khan@gnkhalsa.edu.in",
//         rollno: 448,//477
//         iscompleted:"true",
//         title: "ABCDEF",
//         description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//         category: "Web Development",
//         deployed: "http://localhost:5173/",
//         batch:"Batch3",
//         year:"2024-2025",//2025-2026
//         department:"CS",//IT
//         project: "Project Two",//Project One
//         github: "http://localhost:5173/"
//     },
//     {
//         userId: "6777d0acc916ba93f8fd72e1",
//         name: "aryan gupta",
//         email:"g22.aryan.gupta@gnkhalsa.edu.in",
//         rollno: 418,//477
//         iscompleted:"true",
//         title: "ABCDEF",
//         description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//         category: "Web Development",
//         deployed: "http://localhost:5173/",
//         batch:"Batch3",
//         year:"2024-2025",//2025-2026
//         department:"CS",//IT
//         project: "Project Two",//Project One
//         github: "http://localhost:5173/"
//     },
//     {
//         userId: "6777d0acc916ba93f8fd72e5",
//         name: "kabir das",
//         email:"g22.kabir.das@gnkhalsa.edu.in",
//         rollno: 451,//477
//         iscompleted:"true",
//         title: "ABCDEF",
//         description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//         category: "Web Development",
//         deployed: "http://localhost:5173/",
//         batch:"Batch3",
//         year:"2024-2025",//2025-2026
//         department:"CS",//IT
//         project: "Project Two",//Project One
//         github: "http://localhost:5173/"
//     },
//     {
//         userId: "6777d0acc916ba93f8fd72e6",
//         name: "om das",
//         email:"g22.om.das@gnkhalsa.edu.in",
//         rollno: 436,//477
//         iscompleted:"true",
//         title: "ABCDEF",
//         description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//         category: "Web Development",
//         deployed: "http://localhost:5173/",
//         batch:"Batch3",
//         year:"2024-2025",//2025-2026
//         department:"CS",//IT
//         project: "Project Two",//Project One
//         github: "http://localhost:5173/"
//     },
//     {
//       userId: "6777a009c916ba93f8fd72cc",
//       name: "shiwans vaishya",
//       email:"g22.shiwans.vaishya@gnkhalsa.edu.in",
//       iscompleted:"true",
//       rollno: 477,//477
//       title: "ABCDEF",
//       description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//       category: "Web Development",
//       deployed: "http://localhost:5173/",
//       batch:"Batch2",
//       year:"2024-2025",//2025-2026
//       department:"IT",//IT
//       project: "Project Two",//Project One
//       github: "http://localhost:5173/"
//   },
//   {
//       userId: "6777d0acc916ba93f8fd72d0",
//       name: "kabir patel",
//       email:"g22.kabir.patel@gnkhalsa.edu.in",
//       iscompleted:"true",
//       rollno: 409,//477
//       title: "ABCDEF",
//       description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//       category: "Web Development",
//       deployed: "http://localhost:5173/",
//       batch:"Batch1",
//       year:"2024-2025",//2025-2026
//       department:"CS",//IT
//       project: "Project Two",//Project One
//       github: "http://localhost:5173/"
//   },
//   {
//       userId: "6777d0acc916ba93f8fd72d1",
//       name: "rohan reddy",
//       email:"g22.rohan.reddy@gnkhalsa.edu.in",
//       rollno: 490,//477
//       iscompleted:"true",
//       title: "ABCDEF",
//       description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//       category: "Web Development",
//       deployed: "http://localhost:5173/",
//       batch:"Batch3",
//       year:"2025-2026",//2025-2026
//       department:"IT",//IT
//       project: "Project Two",//Project One
//       github: "http://localhost:5173/"
//   },
//   {
//       userId: "6777d0acc916ba93f8fd72d2",
//       name: "aarav gupta",
//       email:"g22.aarav.gupta@gnkhalsa.edu.in",
//       rollno: 408,//477
//       iscompleted:"true",
//       title: "ABCDEF",
//       description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//       category: "Web Development",
//       deployed: "http://localhost:5173/",
//       batch:"Batch1",
//       year:"2025-2026",//2025-2026
//       department:"IT",//IT
//       project: "Project Two",//Project One
//       github: "http://localhost:5173/"
//   },
//   {
//       userId: "6777d0acc916ba93f8fd72d3",
//       name: "atharv reddy",
//       email:"g22.atharv.reddy@gnkhalsa.edu.in",
//       rollno: 441,//477
//       iscompleted:"true",
//       title: "ABCDEF",
//       description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//       category: "Web Development",
//       deployed: "http://localhost:5173/",
//       batch:"Batch3",
//       year:"2025-2026",//2025-2026
//       department:"CS",//IT
//       project: "Project Two",//Project One
//       github: "http://localhost:5173/"
//   },
//   {
//       userId: "6777d0acc916ba93f8fd72d4",
//       name: "om reddy",
//       email:"g22.om.reddy@gnkhalsa.edu.in",
//       rollno: 471,//477
//       iscompleted:"true",
//       title: "ABCDEF",
//       description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//       category: "Web Development",
//       deployed: "http://localhost:5173/",
//       batch:"Batch3",
//       year:"2025-2026",//2025-2026
//       department:"CS",//IT
//       project: "Project Two",//Project One
//       github: "http://localhost:5173/"
//   },
//   {
//     userId: "6777d0acc916ba93f8fd72cf",
//     name: "om verma",
//     email:"g22.omm.verma@gnkhalsa.edu.in",
//     iscompleted:"true",
//     rollno: 500,//477
//     title: "ABCDEF",
//     description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//     category: "Web Development",
//     deployed: "http://localhost:5173/",
//     batch:"Batch2",
//     year:"2024-2025",//2025-2026
//     department:"IT",//IT
//     project: "Project Two",//Project One
//     github: "http://localhost:5173/"
// },
// {
//     userId: "6777d0acc916ba93f8fd72de",
//     name: "aditya misra",
//     email:"g22.adityaa.mishra@gnkhalsa.edu.in",
//     iscompleted:"true",
//     rollno: 501,//477
//     title: "ABCDEF",
//     description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//     category: "Web Development",
//     deployed: "http://localhost:5173/",
//     batch:"Batch3",
//     year:"2024-2025",//2025-2026
//     department:"CS",//IT
//     project: "Project Two",//Project One
//     github: "http://localhost:5173/"
// },
// {
//     userId: "6777d0acc916ba93f8fd72e3",
//     name: "aarav khan",
//     email:"g22.aaravv.khan@gnkhalsa.edu.in",
//     rollno: 502,//477
//     iscompleted:"true",
//     title: "ABCDEF",
//     description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//     category: "Web Development",
//     deployed: "http://localhost:5173/",
//     batch:"Batch3",
//     year:"2024-2025",//2025-2026
//     department:"CS",//IT
//     project: "Project Two",//Project One
//     github: "http://localhost:5173/"
// },
// {name: "aarav singh",
//     email:"g22.aaravv.singhas@gnkhalsa.edu.in",
//     rollno: 510,//477
//     iscompleted:"true",
//     title: "ABCfdaDEF",
//     description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//     category: "Web Development",
//     deployed: "http://localhost:5173/",
//     batch:"Batch3",
//     year:"2024-2025",//2025-2026
//     department:"CS",//IT
//     project: "Project Two",//Project One
//     github: "http://localhost:5173/"},
//     {name: "aarav singh",
//         email:"g22.aaravdsfv.singhas@gnkhalsa.edu.in",
//         rollno: 511,//477
//         iscompleted:"true",
//         title: "ABCfdaDEF",
//         description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//         category: "Web Development",
//         deployed: "http://localhost:5173/",
//         batch:"Batch3",
//         year:"2024-2025",//2025-2026
//         department:"CS",//IT
//         project: "Project Two",//Project One
//         github: "http://localhost:5173/"},
//         {name: "aarav singh",
//             email:"g22.aaravxcdsfv.singhas@gnkhalsa.edu.in",
//             rollno: 512,//477
//             iscompleted:"true",
//             title: "ABCfdaDEF",
//             description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//             category: "Web Development",
//             deployed: "http://localhost:5173/",
//             batch:"Batch2",
//             year:"2024-2025",//2025-2026
//             department:"CS",//IT
//             project: "Project Two",//Project One
//             github: "http://localhost:5173/"},
//             {name: "aarav singh",
//                 email:"g22.aaravdfdsfsfv.singhas@gnkhalsa.edu.in",
//                 rollno: 513,//477
//                 iscompleted:"true",
//                 title: "ABCfdaDEF",
//                 description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//                 category: "Web Development",
//                 deployed: "http://localhost:5173/",
//                 batch:"Batch2",
//                 year:"2024-2025",//2025-2026
//                 department:"CS",//IT
//                 project: "Project Two",//Project One
//                 github: "http://localhost:5173/"},
//                 {name: "aarav singh",
//                     email:"g22.aaravdsfv.sidfsnghas@gnkhalsa.edu.in",
//                     rollno: 514,//477
//                     iscompleted:"true",
//                     title: "ABCfdaDEF",
//                     description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//                     category: "Web Development",
//                     deployed: "http://localhost:5173/",
//                     batch:"Batch1",
//                     year:"2024-2025",//2025-2026
//                     department:"CS",//IT
//                     project: "Project Two",//Project One
//                     github: "http://localhost:5173/"},
//                     {name: "aarav singh",
//                         email:"g22.aaravdsfv.sifsnghas@gnkhalsa.edu.in",
//                         rollno: 515,//477
//                         iscompleted:"true",
//                         title: "ABCfdaDEF",
//                         description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//                         category: "Web Development",
//                         deployed: "http://localhost:5173/",
//                         batch:"Batch1",
//                         year:"2024-2025",//2025-2026
//                         department:"CS",//IT
//                         project: "Project Two",//Project One
//                         github: "http://localhost:5173/"},
//                         {name: "aarav singh",
//                             email:"g22.daf.fsad@gnkhalsa.edu.in",
//                             rollno: 517,//477
//                             iscompleted:"true",
//                             title: "ABCfdaDEF",
//                             description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//                             category: "Web Development",
//                             deployed: "http://localhost:5173/",
//                             batch:"Batch1",
//                             year:"2024-2025",//2025-2026
//                             department:"CS",//IT
//                             project: "Project One",//Project One
//                             github: "http://localhost:5173/"},
//                             {name: "aarav singh",
//                                 email:"g22.daf.fsdfad@gnkhalsa.edu.in",
//                                 rollno: 518,//477
//                                 iscompleted:"true",
//                                 title: "ABCfdaDEF",
//                                 description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//                                 category: "Web Development",
//                                 deployed: "http://localhost:5173/",
//                                 batch:"Batch1",
//                                 year:"2024-2025",//2025-2026
//                                 department:"CS",//IT
//                                 project: "Project One",//Project One
//                                 github: "http://localhost:5173/"},
//                                 {name: "aarav singh",
//                                     email:"g22.daf.fsfdad@gnkhalsa.edu.in",
//                                     rollno: 517,//477
//                                     iscompleted:"true",
//                                     title: "ABCfdaDEF",
//                                     description: "To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking. To streamline and automate the management of library operations, such as book inventory, user management, borrowing/returning books, and fines tracking.",
//                                     category: "Web Development",
//                                     deployed: "http://localhost:5173/",
//                                     batch:"Batch2",
//                                     year:"2024-2025",//2025-2026
//                                     department:"CS",//IT
//                                     project: "Project One",//Project One
//                                     github: "http://localhost:5173/"},
//   ];

// const realprojects = [
//     {
//         "userId": "67a6be5421b437e39ded0946",
//         "name": "Shiwans Vaishya",
//         "email": "g22.shiwans.vaishya@gnkhalsa.edu.in",
//         "iscompleted": "true",
//         "rollno": 477,
//         "title": "Billbanao",
//         "description": "Overview: BillBanao is a digital solution designed to streamline sales recording, customer payment management, and supplier data handling specifically for wholesalers. The project aims to replace manual processes with an efficient online system, improving operational efficiency and accuracy in financial tracking.\\n\\nKey Features:\\n\\nSales Recording: Users can easily log daily sales transactions, capturing essential details such as amount and quantity.\\nCustomer Payment Management: The system tracks customer payments, allowing businesses to monitor outstanding balances and payment histories.\\nSupplier Database Management: Users can manage supplier information, making it easier to track supply chains and inventory.\\nCustom Queries: The system supports custom date queries to generate reports based on specific time frames.\\nMissed Data Tracking: It alerts users to any missed sales entries, ensuring comprehensive record-keeping.\\nMonthly Reports: Generates monthly financial reports for better analysis of business performance.\\nTechnology Stack:\\n\\nFrontend: React for building user interfaces.\\nBackend: Node.js and Express.js for server-side operations.\\nDatabase: MongoDB for storing sales, customer, and supplier data.\\nExpected Outcomes:\\n\\nIncreased operational efficiency through automated processes.\\nEnhanced accuracy in financial tracking and reporting.\\nImproved customer and supplier relationship management.\\nKey Challenges:\\n\\nIntegration of various system components.\\nEnsuring data security and user privacy.\\nEncouraging user adoption of the new system.\\nDevelopment Timeline:\\n\\nCore Functionality Development: 3 months\\nTesting, Refinement, and Deployment: 1 month\\nThis project is crucial for addressing the inefficiencies faced by wholesalers in managing their sales and customer interactions, leading to improved business operations and profitability.",
//         "category": "Web Development",
//         "deployed": "https://billbanao.onrender.com",
//         "batch": "Batch3",
//         "year": "2024-2025",
//         "department": "CS",
//         "project": "Billbanao",
//         "github": "."
//     },
//     {
//         "userId": "67a6be5421b437e39ded090c",
//         "name": "Awais Chaudhary",
//         "email": "g22.mohammedawais.abdul@gnkhalsa.edu.in",
//         "iscompleted": "true",
//         "rollno": 414,
//         "title": "Twyster",
//         "description": "Twyster is a user-friendly social media platform designed to foster communication and community engagement. It offers a simplified social media experience, drawing inspiration from Twitter's core functionality while providing a streamlined and intuitive user interface. \\n\\nTwyster leverages a robust backend infrastructure built with Node.js and Express.js for efficient handling of user requests and data management. The platform relies on a scalable and reliable database solution, such as MongoDB, to store user data, posts, and other platform information. \\n\\nTwyster\u2019s user interface is built with React, Tailwind CSS and daisyUI, which is a collection of pre-built React components based on Tailwind CSS, providing a head start on design and functionality.",
//         "category": "Web Development",
//         "deployed": "https://twyster-app-production.up.railway.app/login",
//         "batch": "Batch1",
//         "year": "2024-2025",
//         "department": "CS",
//         "project": "Twyster",
//         "github": "https://github.com/AwaisCoder"
//     },
//     {
//         "userId": "67a6be5421b437e39ded0909",
//         "name": "Jeet",
//         "email": "g22.vishwajeet.barai@gnkhalsa.edu.in",
//         "iscompleted": "true",
//         "rollno": 410,
//         "title": "MediChain ",
//         "description": "MediChain is a blockchain-based network for secure, decentralized handling of Electronic Health Records (EHRs). Using Ethereum for data integrity and privacy, smart contracts manage access while IPFS handles file storage. The frontend uses React.js, and the backend uses Node.js & Express.js, with Web3.js ensuring interaction and security.",
//         "category": "Blockchain",
//         "deployed": "https://github.com/vishwajeetbarai",
//         "batch": "Batch1",
//         "year": "2024-2025",
//         "department": "CS",
//         "project": "MediChain ",
//         "github": "https://github.com/vishwajeetbarai/MediChain.git"
//     },
//     {
//         "userId": "67a6be5421b437e39ded092f",
//         "name": "Kalyani Sahane",
//         "email": "g22.kalyani.machinder@gnkhalsa.edu.in",
//         "iscompleted": "true",
//         "rollno": 451,
//         "title": "Tasty Tracks ",
//         "description": "The Tasty Tracks system is a comprehensive food delivery solution designed to provide \\r\\nan efficient and user-friendly experience for customers. Unlike traditional food ordering \\r\\nplatforms, this system is tailored to ensure smooth and seamless interactions between users and \\r\\nrestaurants, streamlining the food delivery process. The system features a responsive user \\r\\ninterface for customers, where they can create accounts, browse menus, select items, and place \\r\\norders. Customers can also view their order history and receive real-time updates on the status \\r\\nof their delivery",
//         "category": "Mobile App Development",
//         "deployed": "https://appetize.io/embed/b_bx45los5ymebuhov5tlne2xr54",
//         "batch": "Batch3",
//         "year": "2024-2025",
//         "department": "CS",
//         "project": "Tasty Tracks ",
//         "github": "."
//     },
//     {
//         "userId": "67a6be5421b437e39ded093a",
//         "name": "Aaryan",
//         "email": "g22.aaryan.dinesh@gnkhalsa.edu.in",
//         "iscompleted": "true",
//         "rollno": 463,
//         "title": "Sehat",
//         "description": "Sehat is a fitness tracking application built using Flutter and Firebase, designed to help users monitor and improve their health. It offers a range of features tailored to fitness enthusiasts, including a barcode scanner for tracking nutritional information, a step counter for monitoring daily activity, and diet plan recommendations. Users can also explore cardio and home workout options, and there is a dedicated page for yoga positions to support mindfulness and flexibility training.",
//         "category": "Mobile App Development",
//         "deployed": "https://appetize.io/app/b_tl535g6nh4flgnvqg6ruk353uq",
//         "batch": "Batch3",
//         "year": "2024-2025",
//         "department": "CS",
//         "project": "Sehat",
//         "github": "."
//     },
//     {
//         "userId": "67a6be5421b437e39ded091d",
//         "name": "Yash",
//         "email": "g22.yash.santosh@gnkhalsa.edu.in",
//         "iscompleted": "true",
//         "rollno": 432,
//         "title": "ChatApp",
//         "description": " A full stack responsive chat app using sockets for realtime communication. We will also be able to create groups and upload files and download files. We have used React, Node.js, Express, MongoDB, Socket.io, Zustand and many more awesome tech to create this app. ",
//         "category": "Web Development",
//         "deployed": "https://github.com/yash793/Synchronous/tree/main",
//         "batch": "Batch2",
//         "year": "2024-2025",
//         "department": "CS",
//         "project": "ChatApp",
//         "github": "."
//     },
//     {
//         "userId": "67a6be5421b437e39ded0942",
//         "name": "Aniket Sodmise",
//         "email": "g22.aniket.sodmise@gnkhalsa.edu.in",
//         "iscompleted": "true",
//         "rollno": 473,
//         "title": "PrimeBid",
//         "description": "Welcome to PrimeBid, the ultimate destination for online auctions and bidding excitement. Founded in 2024, we are dedicated to providing a dynamic and user-friendly platform for buyers and sellers to connect, explore, and transact in a secure and seamless environment.\\n\\nOur Mission\\nAt PrimeBid, our mission is to revolutionize the way people buy and sell items online. We strive to create an engaging and trustworthy marketplace that empowers individuals and businesses to discover unique products, make informed decisions, and enjoy the thrill of competitive bidding.\\n\\nOur Values\\nIntegrity: We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone.\\nInnovation: We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process.\\nCommunity: We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items.\\nCustomer Focus: We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease.\\nOur Story\\nFounded by Aniket Sodmise, PrimeBid was born out of a passion for connecting people with unique and valuable items. With years of experience in the auction industry, our team is committed to creating a platform that offers an unparalleled auction experience for users worldwide.",
//         "category": "Web Development",
//         "deployed": "https://primebidd.netlify.app/",
//         "batch": "Batch3",
//         "year": "2024-2025",
//         "department": "CS",
//         "project": "PrimeBid",
//         "github": "https://github.com/sodmiseaniket/sodmiseaniket.github.io"
//     },
//     {
//         "userId": "67a6be5421b437e39ded0931",
//         "name": "Jasdeep Kaur Saini",
//         "email": "g22.jasdeepkaur.manjitsingh@gnkhalsa.edu.in",
//         "iscompleted": "true",
//         "rollno": 453,
//         "title": "MovieMind",
//         "description": "Developed a content-based movie recommendation system that provides personalized movie suggestions based on user preferences. The system ensures seamless interaction between users and the movie database through a user-friendly interface.\\n\\nKey Features:\\n\\nUser Authentication: Secure login and signup functionality.\\nMovie Selection: Allows users to choose from a variety of movies.\\nMovie Details: Provides in-depth information like cast, overview, and ratings.\\nPersonalized Recommendations: Suggests movies tailored to user tastes.\\nWatch Now Feature: Direct access to streaming links for selected movies.\\nResponsive Design: Built using Tailwind CSS for a smooth user experience.\\nAlgorithm:\\n\\nContent-based filtering using cosine similarity.\\nProcess Overview:\\n\\nInput: Uses movie metadata (e.g., genre, cast, crew, keywords, overview).\\nProcess: Converts movie features into tags and calculates similarity between movies.\\nOutput: Delivers personalized movie recommendations based on user-selected movies.",
//         "category": "Machine Learning",
//         "deployed": "https://github.com/jas1330/MovieMind",
//         "batch": "Batch3",
//         "year": "2024-2025",
//         "department": "CS",
//         "project": "MovieMind",
//         "github": "https://github.com/jas1330"
//     },
//     {
//         "userId": "67a6be5421b437e39ded0912",
//         "name": "Dev Ghildiyal",
//         "email": "g22.dev.ghildiyal@gnkhalsa.edu.in",
//         "iscompleted": "true",
//         "rollno": 421,
//         "title": "The Hearts Of Shadow",
//         "description": "The Hearts of Shadows is a first-person horror game set in a dark, eerie farm haunted by malevolent spirits. Inspired by Pacify, the game challenges you to find and destroy nine cursed chickens that contain the fragmented heart of a ghost. But beware\u2014this is no ordinary hunt.\\n\\nArmed with a cursed object detector, your mission is to explore the haunting farm, gather special objects to activate the machine, and ignite the bonfire to burn the cursed chickens. The farm is populated by 30 chickens, but only nine of them are cursed. To find them, you\u2019ll need to kill any chicken and check it using the machine. If it's cursed, you'll poison it and then burn it to eliminate that piece of the ghost\u2019s heart.\\n\\nAdding to the eerie atmosphere, all the ghostly voices you hear in the game are voiced by me, using no pitch adjustments or sound editing. It\u2019s my real voice, adding an authentic and personal touch to the experience.\\n\\nThe game offers three different maps:\\n\\nFull Farm Map \u2013 The complete game experience, with objects scattered far and wide. Explore the large, dark farm, locate objects, and complete your tasks.\\nCompact Map \u2013 A smaller version where objects are placed closer together for a faster-paced challenge.\\nPrototype Map \u2013 A basic, no-frills map designed for testing gameplay and mechanics.\\nThis game was created in just two weeks as part of my final-year college project, so while it offers a chilling experience, it\u2019s still a work in progress. Some bugs and unpolished areas remain, but I\u2019m actively working on improving it. Social media buttons, settings, and credits are not yet functional but will be added in future updates.\\n\\nI\u2019d love to hear your feedback on what could be improved. Feel free to leave a comment with suggestions, and if you'd like to support the project, your feedback would mean the world to me as I continue development.\\n\\n",
//         "category": "Game Development",
//         "deployed": "https://aixer.itch.io/the-hearts-of-shadow",
//         "batch": "Batch1",
//         "year": "2024-2025",
//         "department": "CS",
//         "project": "The Hearts Of Shadow",
//         "github": "https://github.com/DEV-GHILDIYAL"
//     },
//     {
//         "userId": "67a6be5421b437e39ded0905",
//         "name": "Sadiq Ansari",
//         "email": "g22.mohdsadiq.anwarahmed@gnkhalsa.edu.in",
//         "iscompleted": "true",
//         "rollno": 405,
//         "title": "Chatify",
//         "description": "Chatify is a web-based chatting application for real-time communication using socket.io, it is a minimalistic chat app for lesser distraction, just join chat leave repeat. We have used HTML, CSS, JS for front-end and NodeJs and Express for backend, and Firebase for Database. It has basic functionality like sending messages, attachments, creation of rooms, and many more to come.",
//         "category": "Web Development",
//         "deployed": "https://chatify-pro.netlify.app/",
//         "batch": "Batch1",
//         "year": "2024-2025",
//         "department": "CS",
//         "project": "Chatify",
//         "github": "."
//     }
// ]

const DBconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // const bulkOps = realprojects.map(project => ({
    // const bulkOps = real.map(project => ({
    //   updateOne: {
    //     filter: { email: project.email },
    //     update: { $setOnInsert: project }, // Only set if the document does not exist
    //     upsert: true // Insert if the document doesn't exist
    //   }
    // }));

    // const result = await projectModel.bulkWrite(bulkOps);
    // console.log(`${result.upsertedCount} new project(s) inserted`);
    // console.log(`${result.modifiedCount} existing project(s) updated`);
  } catch (error) {
    console.error("Error connecting to MongoDB or updating data:", error);
  }
};

export default DBconnect;