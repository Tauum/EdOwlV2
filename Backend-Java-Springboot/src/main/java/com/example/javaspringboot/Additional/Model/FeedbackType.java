package com.example.javaspringboot.Additional.Model;

public enum FeedbackType {

    UNDEFINED ("Undefined"),
    QUESTION("Question"),
    RANGE("Range"),
    QUALITATIVE("Qualitative"),
    YESORNO("YesOrNo"),
    VALUESRUBERIC("ValuesRuberic"),
    YESNOMAYBE("YesNoMaybe");


    private final String name;

    FeedbackType(String name) {
        this.name = name;
    }
}

