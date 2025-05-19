import React, { useEffect, useState } from 'react';
import './HomeComponent.css';
import CardSection from '../CardSection/CardSection';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import HorizontalCardSection from '../HorizontalCardSection/HorizontalCardSection';
import { Filter } from '../Filter/Filter';

const HomeComponent = () => {
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [isGridView, setIsGridView] = useState(true); // Move state here
  const [searchTerm, setSearchTerm] = useState('');
  const [searchByRollNumber, setSearchByRollNumber] = useState(false);
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');
  // const [categoryType, setCategoryType] = useState('');
  const [projectType, setProjectType] = useState('');
  const [batchFilter, setBatchFilter] = useState('');

  const handleViewDetail = (projectDetails) => {
    setSelectedProject(projectDetails);
  };
  const handleBack = () => {
    setSelectedProject(null);
  };

  const toggleGridView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="home-container">
      {!selectedProject && (
        <>
          <h1 className="header">All Projects</h1>
          <Filter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchByRollNumber={searchByRollNumber}
            setSearchByRollNumber={setSearchByRollNumber}
            year={year}
            setYear={setYear}
            department={department}
            // categoryType={setCategoryType}
            setDepartment={setDepartment}
            projectType={projectType}
            setProjectType={setProjectType}
            batchFilter={batchFilter}
            setBatchFilter={setBatchFilter}
            isGridView={isGridView}
            toggleGridView={toggleGridView}
          />
        </>
      )}
      {selectedProject ? (
        <ProjectDetail project={selectedProject} onBack={handleBack} />
      ) : (
        <>
          {isGridView ? (
            <HorizontalCardSection 
              onViewDetail={handleViewDetail} 
              searchTerm={searchTerm} 
              searchByRollNumber={searchByRollNumber}
              year={year} 
              department={department} 
              projectType={projectType} 
              batchFilter={batchFilter}
            />
          ) : (
            <CardSection 
              onViewDetail={handleViewDetail} 
              searchTerm={searchTerm} 
              searchByRollNumber={searchByRollNumber}
              year={year} 
              department={department} 
              projectType={projectType} 
              batchFilter={batchFilter}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomeComponent;
