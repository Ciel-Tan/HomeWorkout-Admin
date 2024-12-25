// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import WorkoutTable from "views/admin/dataTables/components/WorkoutTable";
import ExerciseTable from "views/admin/dataTables/components/ExerciseTable";
import React, { useEffect, useState } from "react";

export default function Settings(props) {
  const {type} = props
  // const [showTable, setShowTable] = useState(true)
  const [showTable, setShowTable] = useState({
    planTable: false,
    exercisePlanTable: false,
    approveTable: false,
    approveExerciseTable: false
  })
  const [plan, setPlan] = useState({})
  const [selectedPlanId, setSelectedPlanId] = useState(null)

  useEffect(() => {
    type === 'plan'
      ? setShowTable({
          ...showTable,
          planTable: true,
          exercisePlanTable: false,
          approveTable: false,
          approveExerciseTable: false
        })
      : setShowTable({
          ...showTable,
          planTable: false,
          exercisePlanTable: false,
          approveTable: true,
          approveExerciseTable: false
        })
  }, [type])

  const handleRowClick = (plan) => {
    type === 'plan'
      ? setShowTable({
          ...showTable,
          planTable: false,
          exercisePlanTable: true,
          approveTable: false,
          approveExerciseTable: false
        })
      : setShowTable({
          ...showTable,
          planTable: false,
          exercisePlanTable: false,
          approveTable: false,
          approveExerciseTable: true
        })

    setSelectedPlanId(plan.id)
    setPlan(plan)
  }

  const handleBack = () => {
    setShowTable(prev => ({
      ...prev,
      planTable: type === 'plan',
      exercisePlanTable: false,
      approveTable: type !== 'plan',
      approveExerciseTable: false,
    }))
  }
  
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {showTable.planTable || showTable.approveTable ? (
          <WorkoutTable type={type} onRowClick={handleRowClick}/>
        ) : (
          <ExerciseTable type={type} plan={plan} planId={selectedPlanId} onBack={handleBack}/>
        )}
      </SimpleGrid>
    </Box>
  );
}
