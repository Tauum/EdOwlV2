package com.example.javaspringboot.Submissions.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Statistics {
    private String Task;
    private double avgScore;
    private double origValue;
    private double avgTime;
    public int amount;

    public Double generateAvg(List<Double> values){
        Double sum = 0.0;
        if(!values.isEmpty()) {
            for (Double value : values) {
                sum += value;
            }
            return sum / values.size();
        }
        return sum;
    }
}
