"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdArrowBack, MdKeyboardArrowUp, MdInfoOutline, MdCheckCircle } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Button from '@/components/ui/Button';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Footer2 from '@/components/layout/Footer2';
import StartFillingModal from '@/components/ui/StartFillingModal';
import ReturnDetailsModal from '@/components/modals/ReturnDetailsModal';
import { useItrStore } from '@/store/itrStore';
import { useAuth } from '@/context/AuthContext';
import itrService from '@/services/itrService'; 
import { filingTypeConfig } from '@/config/filingConfig';

export default function MyTaxReturnsPage() {
  const router = useRouter();
  const { profiles, activeProfileId, setActiveProfile, saveCurrentProfileData } = useItrStore();

  const [expandedProfiles, setExpandedProfiles] = useState({});
  const [isStartFillingOpen, setIsStartFillingOpen] = useState(false);
  const [selectedProfileToView, setSelectedProfileToView] = useState(null);

  const { user } = useAuth();
  const [apiProfiles, setApiProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profiles from API
  useEffect(() => {
    const fetchReturns = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try { 
        const userId = user.id || user.user_id;
        const res = await itrService.getItrDetails(userId);  
        console.log("nagesh", res)
        if (res.status && Array.isArray(res.data)) { 
          const mapped = res.data.map(item => {
            const detail = typeof item.detail === 'string' ? JSON.parse(item.detail) : (item.detail || {});
            
            let pan = detail.reviewData?.pan || 'Not Available';
            if (pan === 'Not Provided' || !pan) {
              pan = detail.details?.general?.panNumber || detail.details?.permanent?.panNumber || detail.details?.entity_details?.panNumber || detail.panNumber || detail.pan || 'Not Available';
            }

            let name = 'New User';
            if (detail.reviewData?.name && detail.reviewData.name !== 'Not Provided') {
              name = detail.reviewData.name;
            } else if (detail.details?.general?.companyName) {
              name = detail.details.general.companyName;
            } else if (detail.details?.general?.firmName) {
              name = detail.details.general.firmName;
            } else if (detail.details?.general?.llpName) {
              name = detail.details.general.llpName;
            } else if (detail.details?.general?.aopName) {
              name = detail.details.general.aopName;
            } else if (detail.details?.permanent?.hufName) {
              name = detail.details.permanent.hufName;
            } else if (detail.details?.entity_details?.entityName) {
              name = detail.details.entity_details.entityName;
            } else if (detail.firstName) {
              name = `${detail.firstName} ${detail.lastName || ''}`.trim();
            }

            const filingType = item.itr_type || detail.filingType || detail.selectedFilingType || 'Individual';
            const assessmentYear = detail.assessmentYear || '2026-27';
            const filingStatus = item.status || detail.filingStatus || (detail.acknowledgementNumber ? 'Filed' : 'Pending');
            const acknowledgementNumber = detail.acknowledgementNumber || '';

            return {
              id: item.id.toString(),
              name,
              pan,
              filingType,
              assessmentYear,
              filingStatus,
              acknowledgementNumber,
              createdAt: new Date(item.created_at).getTime() || Date.now(),
              rawDetail: detail
            };
          });
          setApiProfiles(mapped);

          // Update store profiles list & mapping in background
          const storeProfiles = mapped.map(p => ({
            id: p.id,
            name: p.name,
            pan: p.pan,
            filingType: p.filingType,
            assessmentYear: p.assessmentYear,
            filingStatus: p.filingStatus,
            acknowledgementNumber: p.acknowledgementNumber,
            createdAt: p.createdAt
          }));
          const storeMap = {};
          mapped.forEach(p => {
            storeMap[p.id] = p.rawDetail; 
          });
          
          useItrStore.setState({
            profiles: storeProfiles.length > 0 ? storeProfiles : useItrStore.getState().profiles,
            profileDataMap: {
              ...useItrStore.getState().profileDataMap,
              ...storeMap
            }
          });
        } else {
          setError(res.message || 'Failed to fetch tax returns.');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching your returns.');
      } finally {
        setLoading(false);
      }
    };
    fetchReturns();
  }, [user]);

  // Expand the active profile or the first profile by default
  useEffect(() => {
    if (apiProfiles.length > 0) {
      const activeOrFirst = apiProfiles.find(p => p.id === activeProfileId) || apiProfiles[0];
      if (activeOrFirst && expandedProfiles[activeOrFirst.id] === undefined) {
        setExpandedProfiles(prev => ({ ...prev, [activeOrFirst.id]: true }));
      }
    }
  }, [apiProfiles, activeProfileId, expandedProfiles]);

  const toggleExpand = (profileId, e) => {
    e.stopPropagation();
    setExpandedProfiles(prev => ({
      ...prev,
      [profileId]: !prev[profileId]
    }));
  };

  const handleProfileSwitch = (profileId) => {
    if (profileId === activeProfileId) return;
    saveCurrentProfileData();
    setActiveProfile(profileId);
    setExpandedProfiles(prev => ({ ...prev, [profileId]: true }));
  };

  const sortedProfiles = [...apiProfiles].sort((a, b) => {
    if (a.id === activeProfileId) return -1;
    if (b.id === activeProfileId) return 1;
    return (b.createdAt || 0) - (a.createdAt || 0);
  });

  return (
    <ProtectedRoute>
      <div className="top-20 flex  flex-col gap-10   justify-between opacity-100 pt-10 pr-30 pb-10 pl-30">

        {/* Header Section */}
        <div className="flex gap-10   items-center justify-between border-b border-[#C7C7CC] pb-10">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-[#3867D6] hover:bg-gray-100 p-2 rounded-full transition-colors">
              <MdArrowBack size={28} />
            </Link>
            <h1 className="bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent font-['Poppins'] font-semibold text-[28px] leading-[38.4px] tracking-normal">
              My Tax Returns
            </h1>
          </div>
          <Button
            className="h-[48px] px-8 bg-gradient-to-r from-[#1498EB] to-[#962DE3] text-white rounded-[8px] font-semibold text-base leading-[17px] tracking-normal"
            onClick={() => setIsStartFillingOpen(true)}
          >
            Start a new filling
          </Button>
        </div>

        <StartFillingModal
          isOpen={isStartFillingOpen}
          onClose={() => setIsStartFillingOpen(false)}
        />

        <div className="flex flex-col gap-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-poppins">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3867D6] mb-4"></div>
              <p>Loading your tax returns...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#FF383C] font-poppins text-center">
              <MdInfoOutline size={40} className="mb-2 text-[#FF383C]" />
              <p className="font-semibold text-lg">{error}</p>
            </div>
          ) : sortedProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-poppins text-center">
              <p className="text-lg font-medium">No returns found</p>
              <p className="text-sm">Get started by filling your first tax return.</p>
            </div>
          ) : (
            sortedProfiles.map((profile) => {
              const isExpanded = !!expandedProfiles[profile.id];
              const isActive = profile.id === activeProfileId;

              return (
                <div key={profile.id} className="w-full border-b border-b-[#E0E0E0] flex flex-col gap-10 opacity-100 pb-10">
                  <div
                    className={`flex items-center justify-between cursor-pointer ${isActive ? '' : 'hover:opacity-80 transition-opacity'}`}
                    onClick={() => handleProfileSwitch(profile.id)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-[44px] h-[44px] rounded-full bg-[#3867D633] flex items-center justify-center">
                        <span className="text-[#3867D6] font-semibold text-[16px] font-outfit">
                          {profile.name ? profile.name.charAt(0).toUpperCase() : 'N'}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <h2 className="font-poppins font-medium text-[20px] text-black tracking-normal">
                            {profile.name || 'New User'}
                          </h2>
                          <span className="w-auto h-[25px] rotate-0 opacity-100 bg-[#3867D633] justify-center items-center rounded-sm flex gap-[10px] pt-1 pr-2 pb-1 pl-2">
                            <span className="font-poppins font-normal text-[14px] leading-[17px] tracking-normal text-[#3867D6]">
                              {profile.filingType || 'Individual'}
                            </span>
                          </span>
                          <button 
                            className="ml-2 cursor-pointer text-[13px] bg-white border border-[#1498EB] text-[#1498EB] hover:bg-gradient-brand hover:text-white hover:border-transparent px-4 py-1 rounded-[6px] font-medium transition-all shadow-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProfileToView(profile);
                            }}
                          >
                            View
                          </button>
                        </div>
                        <p className="font-poppins font-normal text-[16px] leading-[24px] tracking-normal text-[#8E8E93]">
                          PAN: {profile.pan || 'Not Available'}
                        </p>
                      </div>
                    </div>

                    {/* Collapse Icon */}
                    <div
                      className="w-[44px] h-[44px] rounded-full bg-[#3867D633] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#3867D644]"
                      onClick={(e) => toggleExpand(profile.id, e)}
                    >
                      <MdKeyboardArrowUp
                        size={28}
                        className={`text-[#3867D6] transition-transform duration-300 ${!isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Filing Details Section */}
                  {isExpanded && (
                    <div className="flex ml-14 justify-between items-center animate-in fade-in slide-in-from-top-2 duration-300">
                      {/* Year Info */}
                      <div className="flex flex-col gap-2">
                        <h3 className="font-poppins font-medium text-[20px] leading-[100%] tracking-normal text-black">
                          AY {profile.assessmentYear || '2026-27'}
                        </h3>
                        <p className="font-poppins font-normal text-[16px] leading-[24px] tracking-normal text-[#8E8E93]">
                          (Current Year)
                        </p>
                      </div>

                      {/* Status Rows */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          {profile.filingStatus === 'Filed' ? (
                            <>
                              <MdCheckCircle className="text-[#34C759]" size={27} />
                              <p className="font-poppins font-medium text-[20px] leading-[100%] tracking-normal">
                                E-Filed | <span className="font-poppins font-normal text-[14px] leading-[17px] tracking-normal text-[#34C759]">Filed</span>
                              </p>
                            </>
                          ) : (
                            <>
                              <MdInfoOutline className="text-[#FF383C]" size={27} />
                              <p className="font-poppins font-medium text-[20px] leading-[100%] tracking-normal">
                                E-Filed | <span className="font-poppins font-normal text-[14px] leading-[17px] tracking-normal text-[#FF383C]">Pending</span>
                              </p>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {profile.filingStatus === 'Filed' ? (
                            <>
                              <MdCheckCircle className="text-[#34C759]" size={27} />
                              <p className="font-poppins font-medium text-[20px] leading-[100%] tracking-normal">
                                E-Verification | <span className="font-poppins font-normal text-[14px] leading-[17px] tracking-normal text-[#34C759]">Completed</span>
                              </p>
                            </> 
                          ) : (
                            <>
                              <MdInfoOutline className="text-[#FF383C]" size={27} />
                              <p className="font-poppins font-medium text-[20px] leading-[100%] tracking-normal">
                                E- Verification | <span className="font-poppins font-normal text-[14px] leading-[17px] tracking-normal text-[#FF383C]">Pending</span>
                              </p>
                            </>
                          )}
                        </div>  
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-4">
                        {profile.filingStatus === 'Filed' ? (
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs text-[#8E8E93] font-poppins">Ack: {profile.acknowledgementNumber}</span>
                            <span className="text-sm font-semibold text-[#34C759] font-poppins">Successfully Filed</span>
                          </div>
                        ) : (
                          <Button
                            variant="whiteGradient"
                            className="py-2 px-4 gap-[10px] rounded-lg border font-poppins font-semibold text-base leading-6 tracking-normal"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isActive) handleProfileSwitch(profile.id);
                              
                              const configEntry = Object.values(filingTypeConfig).find(
                                c => c.name === profile.filingType || c.id === profile.filingType
                              );
                              
                              if (configEntry && configEntry.detailsRoute) {
                                router.push(configEntry.detailsRoute);
                              } else {
                                router.push('/dashboard/pan-details');
                              }
                            }}
                          >
                            Continue Filing
                          </Button>
                        )}
                        <div className="text-[#8E8E93] hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer">
                          <BsThreeDotsVertical size={24} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Area */}
        <Footer2 />

      </div>
      
      <ReturnDetailsModal 
        isOpen={!!selectedProfileToView} 
        onClose={() => setSelectedProfileToView(null)} 
        profile={selectedProfileToView} 
      />
    </ProtectedRoute>
  );
} 