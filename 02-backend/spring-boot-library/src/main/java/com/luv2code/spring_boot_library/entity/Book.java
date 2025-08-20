package com.luv2code.spring_boot_library.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "book")
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                 // 列名同名，可不写 @Column

    private String title;
    private String author;
    private String description;

    @Column(name = "copies")         // 表里允许 NULL，用 Integer
    private Integer copies;

    @Column(name = "copies_available")
    private Integer copiesAvailable; // 驼峰 -> 下划线列

    private String category;

    @Lob
    @Column(name = "img")            // MEDIUMBLOB
    @JsonIgnore                      // 避免把大块 base64 直接塞进 JSON（可按需去掉）
    private byte[] img;
}

