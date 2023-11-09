import React from "react";

import { CFooter, CLink } from "@coreui/react";

function AppFooter() {
    return (
        <CFooter>
            <div>
                <CLink href="/">Taxi Hailing App</CLink>
                <span>&copy; 2023 B.Vishnugan</span>
            </div>
            <div>
                <span>Powered by </span>
                <span>React & Spring boot</span>
            </div>
        </CFooter>
    );
}

export default AppFooter;