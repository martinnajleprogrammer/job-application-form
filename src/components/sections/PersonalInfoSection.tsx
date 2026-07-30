import FormField from "../form/FormField";
import TextInput from "../form/TextInput";
import SectionTitle from "../ui/SectionTitle";
import SectionDivider from "../ui/SectionDivider";

const PersonalInfoSection = () => {
  return <>
    <SectionTitle title="Personal Information" />
    <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
      <FormField label="First Name" name="personalInfo.firstName" >
        <TextInput placeholder="First Name" />
      </FormField>
      <FormField label="Last Name" name="personalInfo.lastName">
        <TextInput placeholder="Last Name" />
      </FormField>
      <FormField label="Email" name="personalInfo.email">
        <TextInput type="email" placeholder="Email" />
      </FormField>
      <FormField label="Phone" name="personalInfo.phone">
        <TextInput type="tel" placeholder="Phone" />
      </FormField>
      <FormField label="LinkedIn URL" name="personalInfo.linkedinURL">
        <TextInput type="url" placeholder="LinkedIn URL" />
      </FormField>
      <FormField label="Portfolio URL" name="personalInfo.portfolioURL">
        <TextInput type="url" placeholder="Portfolio URL" />
      </FormField>
    </div>
    <SectionDivider />
  </>
};
export default PersonalInfoSection;