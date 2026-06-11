import {UserCard} from "src/forTests/snapshot/someComponent";
import {render} from "@testing-library/react";
import React from "react";

test('renders correctly', () => {
    const { container } = render(<UserCard text="1234"/>)
    expect(container).toMatchSnapshot();
});