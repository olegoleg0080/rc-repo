import { Form, FormSub, FormTitle, Input, Select } from "./form.styled";

export const FormToDo = () => {
    return (
        <Form>
        <FormTitle>ENTER YOUR DATA</FormTitle>
            <Input placeholder="adfdsfdsfddsfsdf" />
            <Input placeholder="adfdsfddf" />
            <Select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </Select>
            <FormSub type="submit">Add</FormSub>
        </Form>
    );
};
