import React, { useState, useEffect } from 'react';
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { registerUser } from '../redux/actions/authAction';
import { getAllActiveRoles, getAllActiveCompanies } from '../redux/actions/adminActions';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const { activeRoles, activeCompanies } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    roleId: null,
    company: null,
    createdBy: 1,
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
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
    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.phone) errors.phone = 'Phone is required';
    if (!formData.dob) errors.dob = 'Date of Birth is required';
    if (!formData.roleId) errors.roleId = 'Role is required';
    if (!formData.company) errors.company = 'Company is required';
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
        const response = await dispatch(registerUser(finalData));
  
        setSuccessMessage('Employee created successfully');
  
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phone: '',
          dob: '',
          roleId: null,
          company: null,
          createdBy: 1,
        });
  
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setSuccessMessage('Registration failed');
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
    <div className=" py-20  px-40">
      <div className=" mx-auto">
        <h2 className="text-3xl font-bold text-start mb-6">Create Employee</h2>

        {successMessage && (
          <Alert color={successMessage.includes('successfully') ? 'success' : 'failure'}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow-sm rounded-lg">
          <div>
            <Label value="First Name" />
            <TextInput
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-white text-black"
              placeholder="Enter First Name"
              style={{ backgroundColor: 'white', color:"black" }} // Set background to white
            />
            {formErrors.firstName && <p className="text-sm text-red-600">{formErrors.firstName}</p>}
          </div>

          <div>
            <Label value="Last Name" />
            <TextInput
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-white text-black"
              placeholder="Enter Last Name"
              style={{ backgroundColor: 'white', color:"black" }} // Set background to white

            />
            {formErrors.lastName && <p className="text-sm text-red-600">{formErrors.lastName}</p>}
          </div>

          <div>
            <Label value="Email Address" />
            <TextInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white text-black"
              placeholder="name@example.com"
              style={{ backgroundColor: 'white', color:"black" }} // Set background to white

            />
            {formErrors.email && <p className="text-sm text-red-600">{formErrors.email}</p>}
          </div>

          <div>
            <Label value="Password" />
            <TextInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-white text-black"
              placeholder="Enter Password"
              style={{ backgroundColor: 'white', color:"black" }} // Set background to white

            />
            {formErrors.password && <p className="text-sm text-red-600">{formErrors.password}</p>}
          </div>

          <div>
            <Label value="Phone Number" />
            <TextInput
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-white text-black"
              placeholder="Enter Phone Number"
              style={{ backgroundColor: 'white', color:"black" }} // Set background to white

            />
            {formErrors.phone && <p className="text-sm text-red-600">{formErrors.phone}</p>}
          </div>

          <div>
            <Label value="Date of Birth" />
            <TextInput
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="bg-white text-black"
              style={{ backgroundColor: 'white' , color:"black" }} // Set background to white

            />
            {formErrors.dob && <p className="text-sm text-red-600">{formErrors.dob}</p>}
          </div>

          <div>
            <Label value="Select Role" />
            <Select
              name="roleId"
              options={roleOptions}
              value={formData.roleId}
              onChange={handleSelectChange}
              isClearable
              placeholder="Select role..."
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: '#ccc',
                }),
                input: (base) => ({
                  ...base,
                  color: 'black',
                }),
              }}
            />
            {formErrors.roleId && <p className="text-sm text-red-600">{formErrors.roleId}</p>}
          </div>

          <div>
            <Label value="Select Company" />
            <Select
              name="company"
              options={companyOptions}
              value={formData.company}
              onChange={handleSelectChange}
              isClearable
              placeholder="Select company..."
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: '#ccc',
                }),
                input: (base) => ({
                  ...base,
                  color: 'black',
                }),
              }}
            />
            {formErrors.company && <p className="text-sm text-red-600">{formErrors.company}</p>}
          </div>

          <div className="md:col-span-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-2">Creating...</span>
                </>
              ) : (
                'Add Employee'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
