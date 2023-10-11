package com.example.degreeplanner.controller;

import com.example.degreeplanner.model.Degree;
import com.example.degreeplanner.model.dto.DegreeRequestDTO;
import com.example.degreeplanner.model.dto.ValidationResultsDTO;
import com.example.degreeplanner.service.CourseValidationService;
import com.example.degreeplanner.service.DegreeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/degree")
public class DegreeController {

    @Autowired
    private DegreeService degreeService;

    @Autowired
    CourseValidationService courseValidationService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/validate")
    public ResponseEntity<?> validateCourses(@RequestBody DegreeRequestDTO degreeRequest) {
        // Convert the degreeDTO into an actual degree.
        Degree degree = degreeService.convertToDegree(degreeRequest);

        // Evaluate the degrees courses to check if their prerequisites are correct.
        List<List<String>> results = courseValidationService.validate(degree);
        ValidationResultsDTO resultsReturn = new ValidationResultsDTO();
        resultsReturn.setSemesters(results);

        // Return the validaiton results, which is a list of semesters, each semester contains courses that are invalid.
        return ResponseEntity.ok(resultsReturn);
    }

}

