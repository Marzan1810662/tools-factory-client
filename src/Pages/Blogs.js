import React from 'react';

const Blogs = () => {
    return (
        <div className='py-2 my-2'>
            <h1 className='text-4xl font-bold text-[#421700]'>Blogs</h1>
            <div className=' grid grid-cols-1 md:grid-cols-2  gap-4 my-4 px-2 lg:px-10 lg:mx-10'>
                <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title">How will you improve the performance of a React Application?</h2>
                        <p className='text-left break-words'></p>

                    </div>
                </div>
                <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title"> What are the different ways to manage a state in a React application?</h2>
                        <p className ='text-left break-words'></p>

                    </div>
                </div>
                <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title"> How does prototypical inheritance work?</h2>
                        <p className ='text-left break-words'></p>

                    </div>
                </div>
                <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title">Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h2>
                        <p className ='text-left break-words'></p>

                    </div>
                </div>
                <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title">You have an array of products. Each object has a name, price, description, etc. How will you implement a search to find products by name?</h2>
                        <p className ='text-left break-words'></p>

                    </div>
                </div>
                <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title">What is a unit test? Why should write unit tests?</h2>
                        <p className ='text-left break-words'></p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;