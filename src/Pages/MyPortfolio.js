import React from 'react';

const MyPortfolio = () => {
    return (
        <div className='my-5 bg-neutral py-4'>
            <h1 className='text-4xl font-bold text-center my-3'>Developer Portfolio</h1>
            <div className='w-[90%] md:w-3/4 lg:w-2/4 border-2 mx-auto shadow-lg rounded py-12 px-5 md:px-16 text-left bg-base-100'>
                <div className='my-3'>
                    <h3 className='text-center text-2xl my-4 font-bold'>Personal Information</h3>
                    <h3>Name: <span>Marzan Binte Hassan</span></h3>
                    <p>Email: <span>hassanmarzan17@gmail.com</span></p>
                </div>
                <div className='my-3'>
                    <h3 className='text-center text-2xl my-4 font-bold'>Educational Background</h3>
                    <h4>BSc in <span>Computer Science and Engineering</span></h4>
                    <p>Institution: <span>Independent University, Bangladesh.</span></p>
                    <p>Year of Passing: <span>2021</span></p>
                </div>
                <div className='my-3'>
                    <h3 className='text-center text-2xl my-4 font-bold'>Skills</h3>
                    <h4>Expertise: HTML5, CSS3, React.js, JavaScript, Bootstrap5, Tailwind, DaisiUI
                    </h4>
                    <h4>
                        Comfortable: Node.js,Express.js, MongoDB.
                    </h4>
                    <h4>
                        Familiar: Context API,REST API, C++.
                    </h4>
                    <h4>
                        Tools: Git, Github, VS Code ,Microsoft Edge Dev Tool, Firebase,Heroku, Figma.
                    </h4>
                </div>
                <div className='my-3 ml-4'>
                    <h3 className='text-center text-2xl my-4 font-bold'>Project Links</h3>
                    <ul className='list-disc text-primary'>
                        <li>
                            <a target='_blank' rel="noreferrer" href="https://spice-granary.web.app/"> Spice Granary</a>
                        </li>
                        <li>
                            <a target='_blank' rel="noreferrer"  href="https://the-gourmet-kitchen.web.app/">The Gourmet Kitchen</a></li>
                        <li>
                            <a target='_blank' rel="noreferrer"  href="https://sky-castle-convention-center-marzan.netlify.app/">Sky Castle convention center</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyPortfolio;