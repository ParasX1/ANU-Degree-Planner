package com.example.degreeplanner.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ValidationResultsDTO {

    private List<List<List<String>>> degree;
}
