import React from 'react';
import FloatingInput from '@/components/ui/FloatingInput';
import FormSection from '@/components/ui/FormSection';
import Button from '@/components/ui/Button';
import { MdInfoOutline } from 'react-icons/md';

const ConfigurableForm = ({ config, values, onChange, onSave, onNext }) => {
  if (!config) return null;

  return (
    <div className="flex flex-col gap-6 w-full pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h2 className=" font-poppins text-black text-[18px] font-semibold">{config.title}</h2>
        {config.subtitle && (
          <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">{config.subtitle}</p>
        )}
      </div>

      {/* Form Sections */}
      <div className="flex flex-col gap-6">
        {config.sections.map((section, idx) => (
          <FormSection
            key={idx}
            icon={section.icon || MdInfoOutline}
            title={section.title}
            description={section.description}
            defaultExpanded={true}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {section.fields.map((field, fieldIdx) => {
                
                // Handle different field types
                if (field.type === 'select') {
                  return (
                    <FloatingInput
                      key={fieldIdx}
                      as="select"
                      label={field.label}
                      name={field.name}
                      value={values[field.name] || ''}
                      onChange={onChange}
                      helperText={field.helperText}
                    >
                      <option value="" disabled>Select {field.label}</option>
                      {field.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </FloatingInput>
                  );
                }

                return (
                  <FloatingInput
                    key={fieldIdx}
                    type={field.type || 'text'}
                    label={field.label}
                    name={field.name}
                    placeholder={field.placeholder || ''}
                    value={values[field.name] || ''}
                    onChange={onChange}
                    helperText={field.helperText}
                  />
                );
              })}
            </div>
          </FormSection>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 items-center">
        {onSave && (
          <Button variant="brand" onClick={onSave} className="w-32 py-2">
            Save
          </Button>
        )}
        {onNext && (
          <Button variant="brand" onClick={onNext} className="w-32 py-2">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConfigurableForm;
