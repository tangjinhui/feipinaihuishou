package com.recovery.core.sql;

import java.io.Serializable;
import java.util.List;

public abstract class AbstractPage<T> implements Serializable{
    private static final long serialVersionUID = -8435554837758705265L;
    
    /**
     * 总记录数量
     */
    protected int totalRecord;
    /**
     * 数据集合
     */
    protected List<T>results;
    
    /**
     * 
     * @param records 记录总数
     * @param pageNumber //
     * @param pageSize
     */
    public abstract void init(int records, int pageNumber, int pageSize);
    
    public int getTotalRecord() {
        return totalRecord;
    }
    public void setTotalRecord(int records) {
        this.totalRecord = records;
    }
    public List<T> getResults() {
        return results;
    }
    public void setResults(List<T> rows) {
        this.results = rows;
    }
}