import React, { useMemo } from 'react';
import { MdClose } from 'react-icons/md';
import { itr1FieldConfig } from '@/config/individualFieldConfig';
import { itr2FieldConfig } from '@/config/individual2FieldConfig';
import { itr3FieldConfig } from '@/config/individual3FieldConfig';
import { itr4FieldConfig } from '@/config/individual4FieldConfig';

const ReturnDetailsModal = ({ isOpen, onClose, profile }) => {
  if (!isOpen || !profile) return null;

  const rawDetail = profile.rawDetail || {};
  const filingType = profile.filingType;

  const { configList } = useMemo(() => {
    let list = []; 
  

    if (filingType === 'ITR1' || filingType === 'Individual') {
      list = itr1FieldConfig || [];
    } else if (filingType === 'ITR2' || filingType === 'Individual2') {
      list = itr2FieldConfig || [];
    } else if (filingType === 'ITR3' || filingType === 'Individual3') {
      list = itr3FieldConfig || [];
    } else if (filingType === 'ITR4' || filingType === 'Individual4') {

      if (itr4FieldConfig?.mainSections) {
        list = Object.values(itr4FieldConfig.mainSections).map(main => {
          return {
            label: main.label || main.id,
            subsections: main.subsections ? Object.values(main.subsections).map(sub => ({
              title: sub.label || sub.id,
              fieldSections: sub.fieldSections ? Object.values(sub.fieldSections).map(fs => ({
                title: fs.title || fs.label || fs.id,
                fields: (fs.fields || []).map(f => ({
                  ...f,
                  name: f.name || f.id,
                  columns: f.columns ? f.columns.map(col => ({
                    ...col,
                    name: col.name || col.id
                  })) : undefined
                }))
              })) : []
            })) : []
          };
        });
      }
    } else {
      // Fallback
      list = itr1FieldConfig || [];
    }
    return { configList: list };
  }, [filingType]);

  // Helper to extract value from rawDetail using dot notation or by searching deeply
  const getFieldValue = (fieldName) => {
    if (!fieldName) return '-';

    // 1. Check flat top-level (sometimes used)
    if (rawDetail[fieldName] !== undefined && rawDetail[fieldName] !== '') {
      return String(rawDetail[fieldName]);
    }

    // 2. Deep search helper
    let foundValue = '-';
    const deepSearch = (obj) => {
      if (!obj || typeof obj !== 'object') return;
      if (obj[fieldName] !== undefined && obj[fieldName] !== '') {
        foundValue = String(obj[fieldName]);
        return true; // stop searching
      }
      for (const key of Object.keys(obj)) {
        if (deepSearch(obj[key])) return true;
      }
    };

    deepSearch(rawDetail);
    return foundValue;
  };

  const renderField = (field) => {
    if (!field || !field.name || field.type === 'section') return null;

    let value = getFieldValue(field.name);

    // Handle booleans/checkboxes visually
    if (value === 'true') value = 'Yes';
    if (value === 'false') value = 'No';

    return (
      <tr key={field.name} className="border-b border-[#E0E0E0] hover:bg-[#F9FAFB] transition-colors">
        <td className="py-3 px-4 text-[#545456] font-poppins text-[14px] w-1/2 align-top">
          {field.label || field.name}
        </td>
        <td className="py-3 px-4 text-[#1E1E1E] font-poppins font-medium text-[14px] w-1/2 align-top break-words">
          {value}
        </td>
      </tr>
    );
  };

  const renderFieldSection = (fs, index) => {
    if (!fs.fields || fs.fields.length === 0) return null;
    return (
      <div key={index} className="mb-6 bg-white border border-[#E0E0E0] rounded-lg overflow-hidden shadow-sm">
        <div className="bg-[#F4F7FE] py-3 px-4 border-b border-[#E0E0E0]">
          <h4 className="font-poppins font-semibold text-[15px] text-[#3867D6]">{fs.title || 'Section Details'}</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <tbody>
              {fs.fields.map(field => {
                // Handle nested grids/tables
                if (field.type === 'table' || field.type === 'grid') {
                  const gridData = getFieldValue(field.name);
                  let items = [];
                  if (gridData !== '-' && typeof gridData === 'string') {
                    try { items = JSON.parse(gridData); } catch (e) { }
                  } else if (Array.isArray(gridData)) {
                    items = gridData;
                  }

                  if (items.length === 0) {
                    return (
                      <tr key={field.name} className="border-b border-[#E0E0E0]">
                        <td className="py-3 px-4 text-[#545456] font-poppins text-[14px] w-1/2">{field.label}</td>
                        <td className="py-3 px-4 text-[#1E1E1E] font-poppins text-[14px] w-1/2">-</td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={field.name} className="border-b border-[#E0E0E0]">
                      <td colSpan="2" className="p-0">
                        <div className="p-4 bg-gray-50">
                          <p className="font-poppins font-medium text-[14px] mb-2">{field.label}</p>
                          <table className="w-full text-sm border border-[#E0E0E0]">
                            <thead className="bg-[#E0E0E0]">
                              <tr>
                                {field.columns?.map(col => (
                                  <th key={col.name} className="p-2 border border-[#C0C0C0] font-semibold">{col.label}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {items.map((item, idx) => (
                                <tr key={idx} className="bg-white">
                                  {field.columns?.map(col => (
                                    <td key={col.name} className="p-2 border border-[#C0C0C0]">{item[col.name] || '-'}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return renderField(field);
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderSubsection = (sub, index) => {
    if (!sub.fieldSections || sub.fieldSections.length === 0) return null;
    return (
      <div key={index} className="mb-8">
        {sub.title && (
          <h3 className="font-poppins font-semibold text-[18px] text-[#1E1E1E] mb-4 border-b-2 border-[#1498EB] pb-2 inline-block">
            {sub.title}
          </h3>
        )}
        <div className="flex flex-col gap-4">
          {sub.fieldSections.map((fs, idx) => renderFieldSection(fs, idx))}
        </div>
      </div>
    );
  };

  const renderStep = (step, index) => {
    if (!step.subsections || step.subsections.length === 0) return null;
    return (
      <div key={index} className="mb-12">
        <h2 className="font-poppins font-bold text-[22px] text-white bg-gradient-brand py-3 px-6 rounded-lg shadow-md mb-6">
          {step.label || step.title || `Section ${index + 1}`}
        </h2>
        <div className="px-2">
          {step.subsections.map((sub, idx) => renderSubsection(sub, idx))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-2xl shadow-2xl flex flex-col relative overflow-hidden">

        {/* Header */}
        <div className="h-[72px] bg-gradient-brand flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-poppins font-semibold text-[22px]">
              Tax Return Summary
            </h2>
            <span className="bg-white/20 text-white px-3 py-1 rounded text-sm font-medium">
              {filingType} • AY {profile.assessmentYear || '2026-27'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <MdClose size={28} />
          </button>
        </div>

        {/* Print / Export Action Bar */}
        <div className="h-[60px] bg-[#F4F7FE] border-b border-[#E0E0E0] flex items-center justify-between px-8 flex-shrink-0">
          <div className="font-poppins text-[#545456]">
            <span className="font-medium text-black">Name:</span> {profile.name} <span className="mx-2">|</span>
            <span className="font-medium text-black">PAN:</span> {profile.pan}
          </div>
          <button
            className="bg-white border border-[#3867D6] text-[#3867D6] hover:bg-[#3867D6] hover:text-white px-4 py-2 rounded-lg font-poppins font-medium text-sm transition-colors shadow-sm"
            onClick={() => window.print()}
          >
            Print / Export PDF
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#FDFDFD] print:p-0 print:bg-white">
          <div className="print:block">
            {configList.length > 0 ? (
              configList.map((step, index) => renderStep(step, index))
            ) : (
              <div className="flex items-center justify-center h-40 text-gray-500 font-poppins">
                No detailed configuration found for {filingType}.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReturnDetailsModal;
