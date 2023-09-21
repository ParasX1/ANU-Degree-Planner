package com.example.degreeplanner.repository;

import com.example.degreeplanner.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {

    List<Course> findCourseByCodeContainingIgnoreCase(String code);

}
