import React, { useState, useEffect } from "react";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { registerUser } from "../redux/actions/authAction";
import {
  getAllActiveRoles,
  getAllActiveCompanies,
} from "../redux/actions/adminActions";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const { activeRoles, activeCompanies } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    roleId: null,
    company: null,
    createdBy: 1,
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllActiveRoles());
    dispatch(getAllActiveCompanies());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prev) => ({ ...prev, [name]: selectedOption }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.phone) errors.phone = "Phone is required";
    if (!formData.dob) errors.dob = "Date of Birth is required";
    if (!formData.roleId) errors.roleId = "Role is required";
    if (!formData.company) errors.company = "Company is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      const finalData = {
        ...formData,
        roleId: formData.roleId.value,
        company: formData.company.value,
      };

      try {
        await dispatch(registerUser(finalData));
        setSuccessMessage("Employee created successfully");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
          dob: "",
          roleId: null,
          company: null,
          createdBy: 1,
        });

        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setSuccessMessage("Registration failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const roleOptions = activeRoles?.map((role) => ({
    label: role.name,
    value: role.uuId,
  }));

  const companyOptions = activeCompanies?.map((company) => ({
    label: company.name,
    value: company.uuId,
  }));

  return (
    <div className="px-4 py-10 sm:px-8 md:px-16 lg:px-32 h-screen overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-start mb-6">
          Create Employee
        </h2>

        {successMessage && (
          <Alert
            color={
              successMessage.includes("successfully") ? "success" : "failure"
            }
          >
            {successMessage}
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6   justify-start"
        >
          {/* Text fields */}
          {[
            {
              label: "First Name",
              name: "firstName",
              type: "text",
              placeholder: "Enter First Name",
            },
            {
              label: "Last Name",
              name: "lastName",
              type: "text",
              placeholder: "Enter Last Name",
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              placeholder: "name@example.com",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              placeholder: "Enter Password",
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "text",
              placeholder: "Enter Phone Number",
            },
            {
              label: "Date of Birth",
              name: "dob",
              type: "date",
              placeholder: "",
            },
          ].map((field) => (
            <div key={field.name}>
              <Label value={field.label} />
              <TextInput
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                className="bg-white text-black"
                placeholder={field.placeholder}
                style={{ backgroundColor: "white", color: "black" }}
              />
              {formErrors[field.name] && (
                <p className="text-sm text-red-600">{formErrors[field.name]}</p>
              )}
            </div>
          ))}

          {/* Role Dropdown */}
          <div>
            <Label value="Select Role" />
            <Select
              name="roleId"
              options={roleOptions}
              value={formData.roleId}
              onChange={handleSelectChange}
              isClearable
              placeholder="Select role..."
              menuPortalTarget={document.body}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "#ccc",
                }),
                input: (base) => ({
                  ...base,
                  color: "black",
                }),
              }}
            />
            {formErrors.roleId && (
              <p className="text-sm text-red-600">{formErrors.roleId}</p>
            )}
          </div>

          {/* Company Dropdown */}
          <div>
            <Label value="Select Company" />
            <Select
              name="company"
              options={companyOptions}
              value={formData.company}
              onChange={handleSelectChange}
              isClearable
              placeholder="Select company..."
              menuPortalTarget={document.body}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "#ccc",
                }),
                input: (base) => ({
                  ...base,
                  color: "black",
                }),
              }}
            />
            {formErrors.company && (
              <p className="text-sm text-red-600">{formErrors.company}</p>
            )}
          </div>

          {/* Submit Button spans both columns */}
          <div className="lg:col-span-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-2">Creating...</span>
                </>
              ) : (
                "Add Employee"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
