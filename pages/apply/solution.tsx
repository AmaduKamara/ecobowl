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
import { SolutionIcon, TeamIcon } from "../../common/icons";
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
    teamId: Yup.string()
      .required(),
    title: Yup.string()
      .required(),
    description: Yup.string()
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      title: "",
      teamId: ""
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true);

      api.post(`/auth/${record.id}/solution`, values)
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
        <SolutionIcon />
      </div>
      <div className="w-1/2 px-28">
        <h1 className="text-2xl font-semibold">
          Create Solution / Idea / Project
        </h1>
        <p>
          Tell us which solution your team have worked on
        </p>
        <Card className="mt-5">
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
        </Card>
        {
          state == 1 ?
            <Card>
              <form onSubmit={formik.handleSubmit}>
                <p className="pb-2 border-b text-sm font-bold text-gray-500">Solution Details</p>
                <div className="flex -mx-1 pt-2 flex-wrap">

                  <div className="w-full p-3">
                    <InputField
                      required
                      label='Solution Title'
                      placeholder="Solution Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.title && formik.errors.title ? formik.errors.title : ""}
                      name='title' />
                  </div>
                  <div className="w-full p-3">
                    <SelectField
                      required
                      label='Team'
                      placeholder="Team"
                      value={formik.values.teamId}
                      onChange={(value) => handleChange("teamId", value)}
                      error={formik.touched.teamId && formik.errors.teamId ? formik.errors.teamId : ""}>
                      {
                        record.teams.map((row: any) => <Option value={row.id} key={row.name}>{row.name}</Option>)
                      }
                    </SelectField>
                  </div>
                  <div className="w-full p-3">
                    <TextAreaField
                      required
                      label='Explain your solution / idea'
                      placeholder="type solution / idea here"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.description && formik.errors.description ? formik.errors.description : ""}
                      name='description' />
                  </div>
                </div>
                <div className="flex tems-center mt-4 space-x-5 border-t pt-5 px-2">
                  <AppButton onClick={handleClose} outline>Cancel</AppButton>
                  <AppButton type="submit" loading={loading}>Create Solution</AppButton>
                </div>
              </form>
            </Card> :
            state === 2 ?
              <Card className="p-2">
                  <p className="mb-5 font-bold text-base text-green-500">{response}</p>
                  <AppButton onClick={() => setState(1)} loading={loading}>New Solution</AppButton>
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
