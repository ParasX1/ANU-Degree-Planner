package com.example.degreeplanner.model;

import jakarta.persistence.*;

@Entity(name = "course_data")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "unique_id")
    private String id;

    @Column(name = "course_code")
    private String code;

    private String description;

    private String subject;

    private String catalogue;

    private int semester;

    @Column(name = "program_units")
    private int units;

    private String prerequisite;

    @Column(name = "website_link")
    private String webLink;



    public Course() {

    }

    public String getDescription() {
        return description;
    }

    public String getCode() {
        return code;
    }

    public String getSubject() {
        return subject;
    }

    public String getCatalogue() {
        return catalogue;
    }

    public int getSemester() {
        return semester;
    }

    public int getUnits() {
        return units;
    }

    public String getPrerequisite() {
        return prerequisite;
    }

    public String getWebLink() {
        return webLink;
    }
}
