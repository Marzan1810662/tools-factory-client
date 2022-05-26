import React from 'react';

const Blogs = () => {
    return (
        <div className='py-2 my-2'>
            <h1 className='text-4xl font-bold text-[#421700]'>Blogs</h1>
            <div className=' grid grid-cols-1 lg:grid-cols-2  gap-4 my-4 px-2 md:px-5 lg:px-10 lg:mx-10'>
                <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title text-left break-words">1. How will you improve the performance of a React Application?</h2>
                        <p className='text-left break-words'>
                            Improving a website's performance is very crucial. If a websites takes too much time to load a page or images user can loose interest and leave. Here's how we can improve the performence of a react application.
                            <ul className='list-disc ml-5'>
                                <li>- Keeping components state local where possible.However this can result in unorganized and hard to understand the code. It is applicable for small size application </li>
                                <li> - Lazy loading images can improve the applications performance as not all the images loads simultaniously</li>
                                <li>- Memorization can be used to chache a component so that it can re renders from cache memory if the props is not changed.</li>
                                <li>- Splitting code with dynamic import() allows split large file into bundle of small chucks that improves the application's performence</li>
                            </ul>
                        </p>

                    </div>
                </div>
                <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title text-left break-words">2. What are the different ways to manage a state in a React application?</h2>
                        <p className='text-left break-words'>
                            Therer are few different ways to manage to state in react application.
                            <ul className='list-disc ml-5'>
                                <li>
                                    Local State: manage all components in one file. useState() and usereducer() can be used to manage local states
                                </li>
                                <li>
                                    GLobal State: data managed accross varios components. Lifting state up or context api can be used to manage global state
                                </li>
                                <li>
                                    ServerState: Data from an external server that has to be combined with our current UI state.
                                    It is a easy concept but can be hard to manage. useEffet () and useSWR() can be used to maanage server state.
                                </li>
                                <li>
                                    Url State: Data that exists on url. That can be paramters or query.useParams() can be used. useHistory() and useLocation() csn be used with react router
                                </li>
                            </ul>
                        </p>

                    </div>
                </div>
                {/* <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title text-left break-words">3. How does prototypical inheritance work?</h2>
                        <p className='text-left break-words'></p>

                    </div>
                </div> */}
                <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title text-left break-words ">4. Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h2>
                        <p className='text-left break-words'>
                            We should avoid explicitly setting the state because it produces a slew of problems. The following are some examples: If we change it right away, setState() can just overwrite the change we just made.
                            When we directly update the state, the value is not changed right away. Instead, it creates a pending state transition that can only be accessible once this function has been called.
                            All of the components' states will be out of our control.
                        </p>

                    </div>
                </div>
                <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title text-left break-words">5. You have an array of products. Each object has a name, price, description, etc. How will you implement a search to find products by name?</h2>
                        <p className='text-left break-words'>
                            We can use the filter method if we want to get all the products that matcges the name. The filter method will return an array of products that matches.
                            <br />
                            <strong>
                              { ` products.filter(product => product.name === 'searchedName')`}
                            </strong>
                            If we want to find the first product that matches the name we canuse the find method. The find method will return the first product that matches
                            <br />
                            <strong>
                              { ` products.find(product => product.name === 'searchedName')`}
                            </strong>
                        </p>

                    </div>
                </div>
                <div class="card w-full bg-base-100 shadow-xl border">
                    <div class="card-body">
                        <h2 class="card-title text-left break-words">6. What is a unit test? Why should write unit tests?</h2>
                        <p className='text-left break-words'>
                        Individual units or chunks of code are tested in unit testing, which is a type of software testing. Its purpose is to guarantee that each code unit performs as expected. A  method, or an entire class can be  a unit. When we test incredibly small components, our tests can be completed rapidly.
                        </p>
                        <p>
                        Unit tests should be written because they save time, serve as guideline for future developers working on the system, make debugging easier, and allow for code reuse, among other benefits.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;