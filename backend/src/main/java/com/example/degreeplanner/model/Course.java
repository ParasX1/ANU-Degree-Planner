package com.example.degreeplanner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "course_data")
@Getter
@NoArgsConstructor
@Data
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

    @JsonIgnore
    public int getLevel() {
        String level = catalogue.substring(0, 1);
        return Integer.parseInt(level) * 1000;
    }
}
