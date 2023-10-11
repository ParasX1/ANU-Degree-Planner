package com.example.degreeplanner.service;

import com.example.degreeplanner.model.Course;
import com.example.degreeplanner.model.Degree;
import com.example.degreeplanner.service.PrereqParser.Exp;
import com.example.degreeplanner.service.PrereqParser.Parser;
import com.example.degreeplanner.service.PrereqParser.Tokenizer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseValidationService {

    public List<List<List<String>>> validate(Degree degree) {
        // Initialize an empty list for the validation results, and get the degree plan's semesters.
        List<List<List<String>>> validationResults = new ArrayList<>();

        List<List<List<Course>>> degreePlan = degree.getYears();

        for (int year = 0; year < degreePlan.size(); year++) {
            List<List<String>> validationYear = new ArrayList<>();
            for (int sem = 0; sem < 2; sem++) {
                List<Course> degreeSem = degree.getSemester(2*year + sem);
                List<String> validationSem = new ArrayList<>();

                for (Course course : degreeSem) {
                    // Parse the prerequisite to generate an expression.
                    Tokenizer tokenizer = new Tokenizer(course.getPrereqProcessed());
                    Parser parser = new Parser(tokenizer);
                    Exp exp = parser.parseExp();

                    // If the prerequisite evaluates to false (prereqs not met) then add the degree to the validation semester
                    if (!exp.evaluate(degree, 2*year + sem)) {
                        validationSem.add(course.getCode());
                    }
                }

                validationYear.add(validationSem);
            }
            validationResults.add(validationYear);
        }

        return validationResults;
    }

}
