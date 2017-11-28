import { shallow } from "enzyme";
import {HomePage} from "../../components/HomePage";
import React from "react";

test("should render HomePage correctly", () => {
  const wrapper = shallow(<HomePage />);
  expect(wrapper).toMatchSnapshot();
});
