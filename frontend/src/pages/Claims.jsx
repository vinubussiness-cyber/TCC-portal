import React from 'react'

// export default function Claims() {
//   return (
//     <div>Claims</div>
//   )
// }
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Claims() {

    const googleFormUrl =
        "https://forms.gle/VCjh75gH8awQ6PF6A";

    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="page-container">

                    <div className="content-panel">

                        <h2>Employee Claims</h2>

                        <p>
                            Submit your claim using the form below.
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

                            <div className="rounded-xl border border-gray-100 p-[30px] shadow-sm transition hover:shadow-md">
                                <h3 className="font-semibold text-gray-900">On-site Expenses</h3>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Expenses incurred while visiting or working at a client/project site.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-[30px] shadow-sm transition hover:shadow-md">
                                <h3 className="font-semibold text-gray-900">Travel Expenses</h3>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Local or outstation travel expenses related to company or project work.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-[30px] shadow-sm transition hover:shadow-md">
                                <h3 className="font-semibold text-gray-900">Project-related Payments</h3>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Payments made on behalf of the company for project requirements,
                                    materials, services, or other approved project-related expenses.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-[30px] shadow-sm transition hover:shadow-md">
                                <h3 className="font-semibold text-gray-900">Other Business Expenses</h3>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Reasonable expenses incurred for official company work with prior
                                    approval where applicable.
                                </p>
                            </div>

                            <div className="mt-5 rounded-xl border border-gray-200 p-[30px]">
                                <p className="text-sm leading-6 text-gray-700">
                                    <span className="font-semibold text-yellow-400">Important:</span>{" "}
                                    Please submit the claim form with the required expense details and
                                    supporting bills/receipts wherever applicable. All claims are subject
                                    to verification and approval by the management.
                                </p>
                            </div>

                       
                        </div>
                        
                       

                        <hr />

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "30px"
                            }}
                        >

                            <a
                                href={googleFormUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border-amber-50 rounded-lg border hover:border-amber-300"
                                style={{
                                    textDecoration: "none",
                                    padding: "12px 24px"
                                }}
                            >
                                Open Claim Form
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Claims;