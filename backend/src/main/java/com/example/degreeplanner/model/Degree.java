package com.example.degreeplanner.model;

import java.util.ArrayList;

public class Degree {
    /**
     * The DegreePlan.Degree class represents a user's degree plan.
     * It contains a list of semesters, and allows users to add semesters, and courses to the plan.
     */

    private ArrayList<ArrayList<Course>> semesters;

    /**
     * Constructor for the DegreePlan.Degree class.
     */
    public Degree() {
        semesters = new ArrayList<>();
    }

    /**
     * Returns the degree as a list of semesters. Each semester is a list of courses.
     * @return ArrayList<ArrayList<Course>>>
     */
    public ArrayList<ArrayList<Course>> getDegree() {
        return this.semesters;
    }

    /**
     * getSemester method takes a semester as input and returns the list of courses that represent that semester.
     * @param sem an integer representing the semester. 0 = y1s1, 3 = y2s2.
     * @return a list of courses representing the semester that is retrieved.
     */
    public ArrayList<Course> getSemester(int sem) {
        if (sem >= semesters.size()) {
            return null;
        }
        return semesters.get(sem);
    }

    /**
     *
     * @return an int representing how many semesters are in the degree.
     */
    public int getSemesterCount() {
        return semesters.size();
    }

}

