package com.recovery.core.sql;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
/**
 * 对分页的基本数据进行一个简单的封装
 */
public class Page<T> extends AbstractPage<T>{
 
	private static final long serialVersionUID = 877696674262389617L;
	private int pageNo = 1;//页码，默认是第一页
    private int pageSize = 15;//每页显示的记录数，默认是15
    private int totalPage;//总页数
    /**分页索引*/
    private int pageIndex = 0;
   
    private Map<String, Object> params = new HashMap<String, Object>();//其他的参数我们把它分装成一个Map对象
 
    public int getPageNo() {
       return pageNo;
    }
 
    public void setPageNo(int pageNo) {
       this.pageNo = pageNo;
    }
 
    public int getPageSize() {
       return pageSize;
    }
 
    public void setPageSize(int pageSize) {
       this.pageSize = pageSize;
    }
 
    public int getTotalRecord() {
       return totalRecord;
    }
    /**
   	 * @return the pageIndex
   	 */
   	public int getPageIndex() {
   		return pageIndex;
   	}

   	/**
   	 * @param pageIndex the pageIndex to set
   	 */
   	public void setPageIndex(int pageIndex) {
   		this.pageIndex = pageIndex;
   	}
    public void setTotalRecord(int totalRecord) {
       this.totalRecord = totalRecord;
       int totalPage = totalRecord%pageSize==0 ? totalRecord/pageSize : totalRecord/pageSize + 1;
       this.setTotalPage(totalPage);
    }
 
    public int getTotalPage() {
       return totalPage;
    }
 
    public void setTotalPage(int totalPage) {
       this.totalPage = totalPage;
    }
 
    public List<T> getResults() {
       return results;
    }
 
    public void setResults(List<T> results) {
       this.results = results;
    }
   
    public Map<String, Object> getParams() {
       return params;
    }
   
    public void setParams(Map<String, Object> params) {
       this.params = params;
    }
    public Page(int records, int pageNo) {
        init(records, pageNo, pageSize);
    }

    public Page(int records, int pageNo, int pageSize) {
        init(records, pageNo, pageSize);
    }
    @Override
    public void init(int records, int pageNo, int pageSize) {
        // 设置基本参数
        this.pageSize = pageSize;
        this.setTotalRecord(records);
        // 根据输入可能错误的当前号码进行自动纠正
        if (pageNo < 1) {
            this.pageNo = 1;
        } else if (pageNo > totalPage) {
            this.pageNo = totalPage;
        } else {
            this.pageNo = pageNo;
        }
        this.pageIndex = (pageNo-1) * pageSize;
    }

    @Override
    public String toString() {
       StringBuilder builder = new StringBuilder();
       builder.append("Page [pageNo=").append(pageNo).append(", pageSize=")
              .append(pageSize).append(", results=").append(results).append(
                     ", totalPage=").append(totalPage).append(
                     ", totalRecord=").append(totalRecord).append("]");
       return builder.toString();
    }
 
}