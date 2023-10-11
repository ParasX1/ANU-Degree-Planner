package com.example.degreeplanner.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class Degree {

    private List<List<List<Course>>> years;

    /**
     * getSemester method takes a semester as input and returns the list of courses that represent that semester.
     * @param sem an integer representing the semester. 0 = y1s1, 3 = y2s2.
     * @return a list of courses representing the semester that is retrieved.
     */
    public List<Course> getSemester(int sem) {
        int yearIdx = sem / 2;
        int semIdx = sem % 2;

        if (yearIdx > years.size()) {
            return null;
        }
        return years.get(yearIdx).get(semIdx);
    }
}

