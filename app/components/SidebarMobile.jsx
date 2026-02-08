"use client"

import { RxHamburgerMenu } from "react-icons/rx"
import { Sidebar } from "./Sidebar";
import { useState } from "react";



export const SidebarMobile = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    return (
        <div className="drawer md:hidden z-20">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={() => setIsDrawerOpen(!isDrawerOpen)} />
            <div>
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button p-0">
                    <RxHamburgerMenu size="2rem" />
                </label>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <Sidebar setIsDrawerOpen={setIsDrawerOpen} />
            </div>
        </div>
    )
}