package com.example.degreeplanner.service;

import com.example.degreeplanner.model.Degree;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseValidationService {

    public List<List<String>> validate(Degree degree) {
        return new ArrayList<>();
    }

}
