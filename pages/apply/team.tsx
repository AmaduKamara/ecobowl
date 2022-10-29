import * as Yup from "yup";
import { useState } from 'react';
import { Select } from 'antd';
import { api, ApiServer, handle401Error } from '../../api';
import { useFormik } from "formik";
import { InputField } from "../../components/ui/InputField";
import { AppButton } from "../../components/ui/Button";
import { TextAreaField } from "../../components/ui/TextAreaField";
import { wrapper } from "../../redux";
import { DateFormater } from "../../hooks";
import Router from "next/router";
import { TeamIcon } from "../../common/icons";
import { SelectField } from "../../components/ui/SelectField";
import Card from "antd/lib/card/Card";

const { Option } = Select;

const Team = ({ record }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [state, setState] = useState(1);

  const handleClose = () => {
    Router.push("/");
  }

  const handleChange = (name, value) => {
    formik.setFieldValue(name, value);
  }

  const validationSchema = Yup.object({
    members: Yup.array()
      .of(Yup.string())
      .required(),
    name: Yup.string()
      .required(),
    description: Yup.string()
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      name: "",
      members: []
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true);

      api.post(`/auth/${record.id}/team`, values)
        .then(res => res.data)
        .then(({ message }) => {
          setResponse(message);
          setState(2);
          formik.resetForm();
        })
        .catch(handle401Error)
        .finally(() => setLoading(false))
    },
  });

  return (
    <section className="flex items-center h-screen">
      <div className="w-1/2 pr-5 bg-white h-full">
        <TeamIcon />
      </div>
      <div className="w-1/2 px-28">
        <h1 className="text-2xl font-semibold">
          Create Team
        </h1>
        <p>
          Create and register the members on your team
        </p>
        <div className="mt-8">
          <p className="pb-2 border-b text-sm font-bold text-gray-500">Event Details</p>
          <div className="flex text-sm pt-3 flex-wrap">
            <div className="w-1/2 px-2 py-2 flex space-x-2">
              <p>Name:</p>
              <p className="font-bold">{record.name}</p>
            </div>
            <div className="w-1/2 px-2 py-2 flex space-x-2">
              <p>Institution:</p>
              <p className="font-bold">{record.institution.name}</p>
            </div>
            <div className="w-1/2 px-2 py-2 flex space-x-2">
              <p>Start Date:</p>
              <p className="font-bold">{DateFormater(record.startDate)}</p>
            </div>
            <div className="w-1/2 px-2 py-2 flex space-x-2">
              <p>End Date:</p>
              <p className="font-bold">{DateFormater(record.endDate)}</p>
            </div>
          </div>
        </div>
        {
          state == 1 ?
            <Card>
              <form onSubmit={formik.handleSubmit}>
                <p className="pb-2 border-b mt-5 text-sm font-bold text-gray-500">Team Details</p>
                <div className="flex -mx-1 pt-2 flex-wrap">
                  <div className="w-full p-3">
                    <InputField
                      required
                      label='Team Name'
                      placeholder="Team name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                      name='name' />
                  </div>
                  <div className="w-full p-3">
                    <SelectField
                      required
                      mode="multiple"
                      label='Team Members'
                      placeholder="Team Members"
                      value={formik.values.members}
                      onChange={(value) => handleChange("members", value)}
                      error={formik.touched.members && formik.errors.members ? formik.errors.members : ""}>
                      {
                        record.trainees.map((row: any) => <Option value={row.id} key={`${row.forename} ${row.surname}`}>{`${row.forename} ${row.surname} (${row.phone})`}</Option>)
                      }
                    </SelectField>
                  </div>
                  <div className="w-full p-3">
                    <TextAreaField
                      required
                      label='About Team'
                      placeholder="About team"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.description && formik.errors.description ? formik.errors.description : ""}
                      name='description' />
                  </div>
                </div>
                <div className="flex tems-center mt-4 space-x-5 border-t pt-5 px-2">
                  <AppButton onClick={handleClose} outline>Cancel</AppButton>
                  <AppButton type="submit" loading={loading}>Create Team</AppButton>
                </div>
              </form>
            </Card>
            :
            state === 2 ?
              <Card className="p-2">
                <p className="mb-5 font-bold text-base text-green-500">{response}</p>
                <AppButton onClick={() => setState(1)} loading={loading}>New Team</AppButton>
              </Card> : null
        }

      </div>
    </section>
  );
};

export default Team;

export const getServerSideProps = wrapper.getServerSideProps(() => async (ctx: any) => {

  const { req, query } = ctx;

  const id = query.eid;

  const response: any = await ApiServer.getOneWithAuth(`/auth/${id}/get-event`, req);

  return response;
})
