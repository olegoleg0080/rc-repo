import { FormSort, FormSub, Input, Label } from "components/form/form.styled";
import { Field, Formik } from "formik";
import React, { Component } from "react";

const initialValueSort = {
    textSort: "",
    levelSort: "0",
};

export default class SortForm extends Component {
    render() {
        return (
            <Formik
                initialValues={{ ...initialValueSort }}
                onSubmit={(values) => {
                    this.props.onSort(values);
                }}
            >
                <FormSort>
                    <Label>
                        TextSort
                        <Input name="textSort" type="text" />
                    </Label>
                    <Label>
                        <Field as="select" name="levelSort">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Field>
                    </Label>
                    <FormSub type="submit">Add</FormSub>
                </FormSort>
            </Formik>
        );
    }
}
