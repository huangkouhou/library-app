//这段代码是一个 JPA 实体（Entity），把 Java 类 Book 映射到数据库里的 book 表，
//Hibernate/JPA 会用它把表里的每一行变成一个 Book 对象、或把对象保存为一行。
package com.luv2code.spring_boot_library.entity;

import lombok.Data;  
import jakarta.persistence.*;

@Entity
@Table(name = "book")
@Data
public class Book {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "description")
    private String description;

    @Column(name = "copies")
    private int copies;

    @Column(name = "copies_available")
    private int copies_available; 

    @Column(name = "category")
    private String category;

    @Column(name = "img")
    private String img;

}
