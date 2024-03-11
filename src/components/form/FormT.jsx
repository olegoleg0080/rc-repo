import { Component } from "react";
import { FormSub, Label } from "./form.styled";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
const initialValue = {
    title: "",
    description: "",
    level: 1,
};

const schemaValidation = Yup.object({
    title: Yup.string()
        .min(2, "Must be min 2 characters or less")
        .required("Title must be required"),
    description: Yup.string().required("Description must be required"),
    level: Yup.number().oneOf([1, 2, 3]).required("Required"),
});
class FormToDo extends Component {
    // state = initialValue;
    // handleChange = (e) => {
    //     const { name, value } = e.target;
    //     this.setState({ [name]: value });
    // };

    // hendleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.onAdd({ ...this.state, level: Number(this.state.level) });
    //     this.setState(initialValue);
    // };
    // handleChangeChech = (e) =>{
    //     this.setState({agrye: e.target.checked});
    // }
    render() {
        return (
            <Formik
                initialValues={{ ...initialValue }}
                onSubmit={(values, actions) => {
                    actions.resetForm({ ...initialValue });
                    this.props.onAdd(values);
                }}
                validationSchema={schemaValidation}
            >
                <Form>
                    <Label>
                        Title
                        <Field name="title" type="text" />
                        <ErrorMessage component="div" name="title" />
                    </Label>
                    <Label>
                        description
                        <Field name="description" type="text" />
                        <ErrorMessage component="p" name="description" />
                    </Label>
                    <Label>
                        <Field as="select" name="level">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Field>
                    </Label>
                    <FormSub type="submit">Add</FormSub>
                </Form>
            </Formik>
        );
    }
}
export default FormToDo;
