import React from "react"
import { render } from "@testing-library/react"
import {UserCard} from "./someComponent"

test("it renders", () => {
    const { debug } = render(<UserCard />)
    debug()
})