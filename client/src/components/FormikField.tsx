import React, { ReactElement } from 'react'
import { Field } from "formik"
import { TextField } from "@material-ui/core"



interface Props {
    name: string
    type: string
    label: string
}

interface Field {
    field: {}
}

export default function FormikField({ name, type, label }: Props): ReactElement {

    return (
        <Field
            name={name}
            type={type}
        >
            {({ field }: Field) => {
                return (
                    <TextField required fullWidth
                        id={name}
                        label={label} type={type}
                        autoComplete="off"
                        variant="outlined"
                        {...field}
                    />
                )
            }}
        </Field>
    )
}
