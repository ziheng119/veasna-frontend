"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { PatientInfo } from "@/lib/types/patient";
import { Vitals } from "@/lib/types/vitals";
import { HEF } from "@/lib/types/hef";
import { QueuedPatient } from "@/lib/types/patient";
import { PatientFormData } from "@/lib/types/patient";
import { useUserStore } from "@/stores/useUserStore";
import { createVisit } from "@/lib/api/visit/createVisit";

interface PatientFormProps {
    existingPatients: PatientInfo[];
    onSubmit: (patient: QueuedPatient) => void;
    locationId?: number;
}

const getBMICategory = (bmi: number) : string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal Weight";
    if (bmi < 30) return "Overweight";
    if (bmi < 35) return "Obese";
    return "Severely Obese";
}

export function PatientForm({ existingPatients, onSubmit, locationId }: PatientFormProps) {
    const token = useUserStore((state) => state.user?.token);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState("patient-info");

    const [patientInfo, setPatientInfo] =  useState<PatientFormData>({
        face_id: 0,
        english_name: "",
        khmer_name: "",
        date_of_birth: "",
        sex: "",
        phone_number: "",
        address: "",
        age: undefined,
        queue_no: "",
    });

    const [vitals, setVitals] = useState<Vitals>({
        height: "",
        weight: "",
        bmi: "",
        below_3rd_percentile: false,
        category: "",
        bp_systolic: "",
        bp_diastolic: "",
        temperature: "",
        notes: ""
    });

    const [hef, setHEF] = useState<HEF>({
        know_of_hef: "",
        has_hef: "",
        notes: ""
    })

    const calculateAge = () => {
        if (patientInfo.date_of_birth) {
            const today = new Date();
            const birthDate = new Date(patientInfo.date_of_birth);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            const calculatedAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
                ? age - 1 : age;
            
            setPatientInfo(prev => ({ ...prev, age: calculatedAge }));
        }
    };

    const calculateBMI = () => {
        const heightM = parseFloat(vitals.height) / 100; // Convert cm to m
        const weightKg = parseFloat(vitals.weight);
        
        if (heightM > 0 && weightKg > 0) {
          const bmiValue = weightKg / (heightM * heightM);
          const roundedBMI = Math.round(bmiValue * 10) / 10;
          
          setVitals(prev => ({
            ...prev,
            bmi: roundedBMI.toString(),
            category: getBMICategory(roundedBMI)
          }));
        }
      };

      const checkExistingPatient = () => {
        const name = patientInfo.english_name || patientInfo.khmer_name;
        if (!name) return;
        
        const found = existingPatients.find(
          p => p.english_name.toLowerCase().includes(name.toLowerCase()) ||
               p.khmer_name.toLowerCase().includes(name.toLowerCase())
        );
        
        if (found) {
          setPatientInfo(found);
        } else {
          alert("No existing patient found with that name");
        }
      };

    const handleSubmit = async () => {
        if (!locationId || !token) {
          alert("Location not selected or user not authenticated.");
          return;
        }
        if (!patientInfo.queue_no || !patientInfo.english_name || !patientInfo.sex) {
        alert("Please fill in required fields: Queue Number, English Name, and Sex");
        return;
        }

        setIsSubmitting(true);

        const completePatientInfo = { ...patientInfo, location_id: locationId };

        try {
          const newQueuedPatient = await createVisit(
            { patientInfo: completePatientInfo, vitals ,hef },
            token
          );

          // on success, call the onsubmit prop passed from the parent page
          onSubmit(newQueuedPatient);

          // Reset form states
          setPatientInfo({
            face_id: 0,
            queue_no: "",
            english_name: "",
            khmer_name: "",
            date_of_birth: "",
            sex: "",
            phone_number: "",
            address: "",
            age: undefined,
          });
          setVitals({
            height: "",
            weight: "",
            bmi: "",
            below_3rd_percentile: false,
            category: "",
            bp_systolic: "",
            bp_diastolic: "",
            temperature: "",
            notes: ""
          });
          setHEF({
            know_of_hef: "",
            has_hef: "",
            notes: ""
          });
          setActiveTab("patient-info");
        } catch (error) {
          console.error("Submissio failed: ", error)
          alert(`Error: ${error instanceof Error ? error.message : "Could not add patient to queue."}`);
        } finally {
          setIsSubmitting(false);
        }

        
    };

    return (
        <Card className="h-full bg-slate-800 border-slate-700">
          <CardHeader className="bg-slate-900 border-b border-slate-700">
            <CardTitle className="text-slate-100">Patient Registration</CardTitle>
          </CardHeader>
          <CardContent className="bg-slate-800">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 bg-slate-700 text-slate-300">
                <TabsTrigger value="patient-info" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Patient Info</TabsTrigger>
                <TabsTrigger value="vitals" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Vitals</TabsTrigger>
                <TabsTrigger value="hef" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">HEF</TabsTrigger>
              </TabsList>
              
              <TabsContent value="patient-info" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="queueNumber" className="text-slate-200">Queue Number *</Label>
                    <Input
                      id="queueNumber"
                      value={patientInfo.queue_no}
                      onChange={(e) => setPatientInfo(prev => ({ ...prev, queue_no: e.target.value }))}
                      placeholder="e.g., 12A"
                      className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sex" className="text-slate-200">Sex *</Label>
                    <Select 
                      value={patientInfo.sex} 
                      onValueChange={(value) => setPatientInfo(prev => ({ ...prev, sex: value as "M" | "F" }))}
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-2">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="M" className="text-slate-100 hover:bg-slate-600">Male</SelectItem>
                        <SelectItem value="F" className="text-slate-100 hover:bg-slate-600">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
    
                <div>
                  <Label htmlFor="englishName" className="text-slate-200">English Name *</Label>
                  <Input
                    id="englishName"
                    value={patientInfo.english_name}
                    onChange={(e) => setPatientInfo(prev => ({ ...prev, english_name: e.target.value }))}
                    placeholder="Enter English name"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                  />
                </div>
    
                <div>
                  <Label htmlFor="khmerName" className="text-slate-200">Khmer Name</Label>
                  <Input
                    id="khmerName"
                    value={patientInfo.khmer_name}
                    onChange={(e) => setPatientInfo(prev => ({ ...prev, khmer_name: e.target.value }))}
                    placeholder="Enter Khmer name"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                  />
                </div>
    
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth" className="text-slate-200">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={patientInfo.date_of_birth}
                      onChange={(e) => setPatientInfo(prev => ({ ...prev, date_of_birth: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age" className="text-slate-200">Age</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="age"
                        type="number"
                        value={patientInfo.age || ""}
                        onChange={(e) => setPatientInfo(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                        placeholder="Age"
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={calculateAge}
                        className={`${
                          patientInfo.date_of_birth 
                            ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600" 
                            : "bg-slate-700 border-slate-600 text-slate-300"
                        }`}
                      >
                        Calculate
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber" className="text-slate-200">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={patientInfo.phone_number || ""}
                      onChange={(e) => setPatientInfo(prev => ({ ...prev, phone_number: e.target.value }))}
                      placeholder="Phone number"
                      className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                    />
                  </div>
                </div>
    
                <div>
                  <Label htmlFor="address" className="text-slate-200">Address</Label>
                  <Textarea
                    id="address"
                    value={patientInfo.address || ""}
                    onChange={(e) => setPatientInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter address"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                  />
                </div>
    
                <div>
                  <Label htmlFor="faceId" className="text-slate-200">Face ID</Label>
                  <Input
                    id="faceId"
                    value={patientInfo.face_id}
                    onChange={(e) => setPatientInfo(prev => ({ ...prev, face_id: parseInt(e.target.value) || 0 }))}
                    placeholder="Face ID"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                  />
                </div>
              </TabsContent>
    
              <TabsContent value="vitals" className="space-y-4 mt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="height" className="text-slate-200">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      value={vitals.height}
                      onChange={(e) => setVitals(prev => ({ ...prev, height: e.target.value }))}
                      placeholder="Height in cm"
                      className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-slate-200">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={vitals.weight}
                      onChange={(e) => setVitals(prev => ({ ...prev, weight: e.target.value }))}
                      placeholder="Weight in kg"
                      className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bmi" className="text-slate-200">BMI</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="bmi"
                        value={vitals.bmi}
                        readOnly
                        placeholder="BMI"
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={calculateBMI}
                        className={`${
                          vitals.height && vitals.weight 
                            ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600" 
                            : "bg-slate-700 border-slate-600 text-slate-300"
                        }`}
                      >
                        Calculate
                      </Button>
                    </div>
                  </div>
                </div>
    
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="below3rd"
                    checked={vitals.below_3rd_percentile}
                    onCheckedChange={(checked) => setVitals(prev => ({ 
                      ...prev, 
                      below_3rd_percentile: checked as boolean 
                    }))}
                    className="border-slate-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="below3rd" className="text-slate-300">Child is below 3rd percentile (BMI by age)</Label>
                </div>
    
                <div>
                  <Label htmlFor="category" className="text-slate-200">Category</Label>
                  <Input
                    id="category"
                    value={vitals.category}
                    readOnly
                    placeholder="BMI category (auto-calculated)"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                  />
                </div>
    
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="systolic" className="text-slate-200">Blood Pressure - Systolic</Label>
                    <Input
                      id="systolic"
                      type="number"
                      value={vitals.bp_systolic}
                      onChange={(e) => setVitals(prev => ({ ...prev, bp_systolic: e.target.value }))}
                      placeholder="Systolic"
                      className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="diastolic" className="text-slate-200">Blood Pressure - Diastolic</Label>
                    <Input
                      id="diastolic"
                      type="number"
                      value={vitals.bp_diastolic}
                      onChange={(e) => setVitals(prev => ({ ...prev, bp_diastolic: e.target.value }))}
                      placeholder="Diastolic"
                      className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                    />
                  </div>
                </div>
    
                <div>
                  <Label htmlFor="temperature" className="text-slate-200">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={vitals.temperature}
                    onChange={(e) => setVitals(prev => ({ ...prev, temperature: e.target.value }))}
                    placeholder="Temperature in Celsius"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                  />
                </div>
    
                <div>
                  <Label htmlFor="notes" className="text-slate-200">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={vitals.notes}
                    onChange={(e) => setVitals(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes about vitals"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 mt-2"
                  />
                </div>
              </TabsContent>
    
              <TabsContent value="hef" className="space-y-6 mt-6">
                <div>
                  <Label className="text-slate-200 block mb-4">Does patient know about HEF?</Label>
                  <RadioGroup 
                    value={hef.know_of_hef} 
                    onValueChange={(value) => setHEF(prev => ({ ...prev, know_of_hef: value as "yes" | "no" }))}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="knows-yes" className="border-slate-500 text-blue-600" />
                      <Label htmlFor="knows-yes" className="text-slate-300">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="knows-no" className="border-slate-500 text-blue-600" />
                      <Label htmlFor="knows-no" className="text-slate-300">No</Label>
                    </div>
                  </RadioGroup>
                </div>
    
                <div>
                  <Label className="text-slate-200 block mb-4">Does patient have HEF?</Label>
                  <RadioGroup 
                    value={hef.has_hef} 
                    onValueChange={(value) => setHEF(prev => ({ ...prev, has_hef: value as "yes" | "no" }))}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="has-yes" className="border-slate-500 text-blue-600" />
                      <Label htmlFor="has-yes" className="text-slate-300">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="has-no" className="border-slate-500 text-blue-600" />
                      <Label htmlFor="has-no" className="text-slate-300">No</Label>
                    </div>
                  </RadioGroup>
                </div>
    
                <div>
                  <Label htmlFor="hefReason" className="text-slate-200 block mb-3">Does patient use HEF? Why or Why not?</Label>
                  <Textarea
                    id="hefReason"
                    value={hef.notes}
                    onChange={(e) => setHEF(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Explain patient's HEF usage and reasoning"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                  />
                </div>
              </TabsContent>
            </Tabs>
    
            <div className="flex justify-end gap-3 mt-6">
              <Button 
                onClick={checkExistingPatient}
                variant="outline"
                className="px-6 bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
              >
                Check Existing
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="px-8 bg-green-600 hover:bg-green-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit & Add to Queue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      );


}